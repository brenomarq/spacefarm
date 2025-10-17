import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Adiciona o diretório src ao path para que o Python encontre os módulos
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.main import app
from src.core.database import Base
from src.usuarios.router import get_db

# --- Configuração do Banco de Dados de Teste em Memória ---
# Usamos um banco de dados SQLite em memória para os testes
# connect_args e StaticPool são necessários para o SQLite em memória com múltiplos threads
TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Cria as tabelas no banco de dados em memória antes de qualquer teste
Base.metadata.create_all(bind=engine)

# --- Sobrescrevendo a Dependência get_db ---
# Esta função será usada em vez da original (get_db) durante os testes
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Aplica a sobrescrita de dependência na nossa aplicação FastAPI
app.dependency_overrides[get_db] = override_get_db

# Cria um cliente de teste que usará nosso banco de dados em memória
client = TestClient(app)


# --- Início dos Testes do CRUD de Usuários ---

def test_criar_usuario_sucesso():
    """Testa a criação de um novo usuário com sucesso."""
    response = client.post(
        "/usuarios/",
        json={"nome": "João Teste", "email": "joao@teste.com", "senha": "123"},
    )
    assert response.status_code == 201, response.text
    data = response.json()
    assert data["email"] == "joao@teste.com"
    assert data["nome"] == "João Teste"
    assert "id" in data
    # A senha nunca deve ser retornada na resposta!
    assert "senha" not in data

def test_criar_usuario_email_duplicado():
    """Testa a falha ao tentar criar um usuário com um e-mail que já existe."""
    # Primeiro, cria um usuário para garantir que o e-mail exista
    client.post(
        "/usuarios/",
        json={"nome": "Maria Original", "email": "maria@original.com", "senha": "123"},
    )
    # Agora, tenta criar outro com o mesmo e-mail
    response = client.post(
        "/usuarios/",
        json={"nome": "Maria Duplicada", "email": "maria@original.com", "senha": "abc"},
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Email já cadastrado"}

def test_listar_usuarios():
    """Testa se a listagem de usuários retorna os usuários criados."""
    # Limpa as tabelas para um estado conhecido (necessário se os testes não forem isolados)
    # Como nosso banco é em memória e usamos fixtures (abaixo), isso é uma garantia extra
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    # Cria alguns usuários
    client.post("/usuarios/", json={"nome": "Carlos", "email": "carlos@teste.com", "senha": "123"})
    client.post("/usuarios/", json={"nome": "Ana", "email": "ana@teste.com", "senha": "123"})

    response = client.get("/usuarios/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["nome"] == "Carlos"
    assert data[1]["nome"] == "Ana"

def test_obter_usuario_sucesso():
    """Testa a busca de um usuário específico que existe."""
    response_post = client.post(
        "/usuarios/",
        json={"nome": "Usuario Unico", "email": "unico@teste.com", "senha": "123"},
    )
    usuario_id = response_post.json()["id"]

    response_get = client.get(f"/usuarios/{usuario_id}")
    assert response_get.status_code == 200
    data = response_get.json()
    assert data["id"] == usuario_id
    assert data["email"] == "unico@teste.com"

def test_obter_usuario_nao_encontrado():
    """Testa a busca de um usuário com um ID que não existe."""
    response = client.get("/usuarios/9999") # Um ID que provavelmente não existe
    assert response.status_code == 404
    assert response.json() == {"detail": "Usuário não encontrado"}

def test_atualizar_usuario_sucesso():
    """Testa a atualização bem-sucedida de um usuário."""
    response_post = client.post(
        "/usuarios/",
        json={"nome": "Para Atualizar", "email": "para.atualizar@teste.com", "senha": "antiga"},
    )
    usuario_id = response_post.json()["id"]

    response_put = client.put(
        f"/usuarios/{usuario_id}",
        json={"nome": "Nome Atualizado", "email": "email.atualizado@teste.com", "senha": "nova"},
    )
    assert response_put.status_code == 200
    data = response_put.json()
    assert data["nome"] == "Nome Atualizado"
    assert data["email"] == "email.atualizado@teste.com"

def test_deletar_usuario_sucesso():
    """Testa a remoção de um usuário e verifica se ele não pode mais ser encontrado."""
    response_post = client.post(
        "/usuarios/",
        json={"nome": "Para Deletar", "email": "para.deletar@teste.com", "senha": "temp"},
    )
    usuario_id = response_post.json()["id"]

    # Deleta o usuário
    response_delete = client.delete(f"/usuarios/{usuario_id}")
    assert response_delete.status_code == 200
    assert response_delete.json() == {"mensagem": "Usuário removido com sucesso"}

    # Verifica se o usuário realmente foi deletado (deve retornar 404)
    response_get = client.get(f"/usuarios/{usuario_id}")
    assert response_get.status_code == 404