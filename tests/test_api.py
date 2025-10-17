import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient, ASGITransport

# Adiciona o diretório src ao path para que o Python encontre os módulos
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.main import app

client = TestClient(app)

def test_read_root():
    """Testa se o endpoint raiz está funcionando."""
    response = client.get("/")
    assert response.status_code == 200
    
    # Dicionário esperado
    expected_data = {
        "status": "ok",
        "message": "Bem-vindo à API do SpaceFarm!"
    }
    
    assert response.json() == expected_data

def test_get_heatmap_success():
    """Testa a geração bem-sucedida de um mapa de calor."""
    response = client.get("/heatmap/temperatura")
    assert response.status_code == 200
    assert response.headers['content-type'] == 'image/png'
    assert len(response.content) > 1000

def test_get_heatmap_invalid_parameter():
    """Testa a resposta para um parâmetro inválido."""
    response = client.get("/heatmap/parametro_invalido")
    assert response.status_code == 422
    
    # Verifica a estrutura do erro de validação do FastAPI/Pydantic V2
    json_response = response.json()
    assert "detail" in json_response
    assert isinstance(json_response["detail"], list)
    assert len(json_response["detail"]) > 0
    
    # A forma mais robusta é checar o tipo de erro específico
    error_details = json_response["detail"][0]
    assert error_details["type"] == "enum"
    assert error_details["loc"] == ["path", "parameter"]

@pytest.mark.asyncio
async def test_get_heatmap_async():
    """Testa o endpoint de heatmap de forma assíncrona."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/heatmap/ph")
    
    assert response.status_code == 200
    assert response.headers['content-type'] == 'image/png'