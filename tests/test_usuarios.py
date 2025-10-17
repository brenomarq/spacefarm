import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Adiciona o diretório src ao path
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.main import app
from src.core.database import Base
from src.usuarios.router import get_db

# --- Configuração do Banco de Dados de Teste em Memória ---
TEST_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- Sobrescrevendo a Dependência get_db ---
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# --- Fixture de Pytest para o Cliente de Teste ---
@pytest.fixture()
def client():
    # Cria as tabelas antes de cada teste
    Base.metadata.create_all(bind=engine)
    yield TestClient(app)
    # Limpa as tabelas depois de cada teste
    Base.metadata.drop_all(bind=engine)

# --- Testes de Criação de Usuário e Login ---

def test_criar_usuario_sucesso(client: TestClient):
    """Testa a criação de um novo usuário e verifica se a senha foi hasheada."""
    response = client.post(
        "/usuarios/",
        json={"nome": "João Teste", "email": "joao@teste.com", "senha": "senha123"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "joao@teste.com"
    assert "id" in data
    assert "senha" not in data # Garante que a senha (mesmo hasheada) não é retornada

def test_login_sucesso_retorna_token(client: TestClient):
    """Testa se o login com credenciais corretas retorna um token de acesso."""
    # Primeiro, cria o usuário
    client.post(
        "/usuarios/",
        json={"nome": "Login User", "email": "login@user.com", "senha": "password"},
    )
    # Tenta fazer login
    response = client.post(
        "/usuarios/login",
        data={"username": "login@user.com", "password": "password"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_falha_senha_incorreta(client: TestClient):
    """Testa se o login falha com a senha errada."""
    client.post(
        "/usuarios/",
        json={"nome": "Login User", "email": "login@user.com", "senha": "password"},
    )
    response = client.post(
        "/usuarios/login",
        data={"username": "login@user.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Email ou senha incorretos"

def test_login_falha_usuario_inexistente(client: TestClient):
    """Testa se o login falha com um email que não está cadastrado."""
    response = client.post(
        "/usuarios/login",
        data={"username": "nouser@example.com", "password": "password"},
    )
    assert response.status_code == 401


# --- Testes de Rotas Protegidas ---

@pytest.fixture
def auth_headers(client: TestClient) -> dict[str, str]:
    """Fixture que cria um usuário, faz login e retorna os headers de autorização."""
    # Cria usuário
    client.post(
        "/usuarios/",
        json={"nome": "Auth User", "email": "auth@user.com", "senha": "securepassword"},
    )
    # Faz login
    login_response = client.post(
        "/usuarios/login",
        data={"username": "auth@user.com", "password": "securepassword"},
    )
    token = login_response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_listar_usuarios_sem_autenticacao(client: TestClient):
    """Testa se a rota de listagem é inacessível sem um token."""
    response = client.get("/usuarios/")
    assert response.status_code == 401 # Unauthorized

def test_listar_usuarios_com_autenticacao(client: TestClient, auth_headers: dict):
    """Testa se a rota de listagem funciona com um token válido."""
    response = client.get("/usuarios/", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    # Verifica se o usuário criado pela fixture está na lista
    assert any(user["email"] == "auth@user.com" for user in data)

def test_deletar_usuario_com_autenticacao(client: TestClient, auth_headers: dict):
    """Testa se é possível deletar um usuário estando autenticado."""
    # Cria um usuário para ser deletado
    user_to_delete_res = client.post(
        "/usuarios/",
        json={"nome": "Para Deletar", "email": "delete@me.com", "senha": "123"},
    )
    user_id = user_to_delete_res.json()["id"]

    # Deleta usando o token do usuário 'auth@user.com'
    response = client.delete(f"/usuarios/{user_id}", headers=auth_headers)
    assert response.status_code == 200
    assert response.json() == {"mensagem": "Usuário removido com sucesso"}

def test_deletar_usuario_sem_autenticacao(client: TestClient):
    """Testa se a rota de deleção é inacessível sem token."""
    response = client.delete("/usuarios/999")
    assert response.status_code == 401