from fastapi import FastAPI, HTTPException, Path
from fastapi.responses import StreamingResponse
import pandas as pd
from pathlib import Path as SystemPath

# --- Imports da funcionalidade de Heatmap ---
from .core.heatmap import create_heatmap_from_scatter
from .models.parameters import AvailableParameters

# --- Imports da NOVA funcionalidade de Usuários ---
from .core import database
from .usuarios import models as usuarios_models
from .usuarios import router as usuarios_router

# Cria a tabela de usuários no banco de dados (se não existir)
# É crucial importar o modelo (usuarios_models) para que o Base o conheça
usuarios_models.Base.metadata.create_all(bind=database.engine)

# Define o caminho para o arquivo de dados
DATA_FILE_PATH = SystemPath(__file__).parent.parent / "data" / "dados_estacas.csv"

app = FastAPI(
    title="API da SpaceFarm - Mapas de Calor e Usuários",
    description="Uma API para gerar mapas de calor e gerenciar usuários.",
    version="1.1.0"
)

# --- INCLUSÃO DO ROTEADOR DE USUÁRIOS ---
# Todas as rotas de usuarios/router.py serão adicionadas aqui
# com o prefixo /usuarios e a tag "Usuários" na documentação
app.include_router(
    usuarios_router.router, 
    prefix="/usuarios", 
    tags=["Usuários"]
)


# --- Lógica de dados para o Heatmap (pode ser movida para um módulo 'data_loader' no futuro) ---
def load_data() -> pd.DataFrame:
    """Carrega os dados do arquivo CSV para um DataFrame do Pandas."""
    try:
        df = pd.read_csv(DATA_FILE_PATH)
        return df
    except FileNotFoundError:
        raise HTTPException(
            status_code=500,
            detail="Arquivo de dados não encontrado. Verifique a configuração do servidor."
        )

# --- Endpoints existentes ---

@app.get("/", tags=["Root"], summary="Verifica se a API está online.")
async def read_root():
    """Endpoint raiz para verificar a saúde da API."""
    return {"status": "ok", "message": "Bem-vindo à API do SpaceFarm!"}


@app.get(
    "/heatmap/{parameter}",
    tags=["Mapas de Calor"],
    summary="Gera um mapa de calor para um parâmetro específico.",
    # ... (o resto da definição do endpoint permanece o mesmo) ...
)
async def get_heatmap(
    parameter: AvailableParameters = Path(
        ...,
        description="O parâmetro a ser usado para gerar o mapa de calor."
    )
):
    """
    Gera e retorna um mapa de calor para um dos seguintes parâmetros:
    - **umidade**: Nível de umidade do solo.
    - **temperatura**: Temperatura do solo.
    - **npk**: Nível de Nitrogênio, Fósforo e Potássio.
    - **ph**: Nível de pH do solo.
    """
    df = load_data()
    parameter_column_name = parameter.value
    image_bytes = create_heatmap_from_scatter(df, parameter_column_name)
    return StreamingResponse(iter([image_bytes]), media_type="image/png")