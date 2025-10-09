from fastapi import FastAPI, HTTPException, Path
from fastapi.responses import StreamingResponse
import pandas as pd
from pathlib import Path as SystemPath

from .core.heatmap import create_heatmap_from_scatter
from .models.parameters import AvailableParameters

# Define o caminho para o arquivo de dados
# Usamos SystemPath para garantir compatibilidade entre sistemas operacionais
DATA_FILE_PATH = SystemPath(__file__).parent.parent / "data" / "dados_estacas.csv"

app = FastAPI(
    title="SpaceFarm API",
    description="Uma API para gerar mapas de calor a partir de dados de estacas.",
    version="1.0.0"
)

def load_data() -> pd.DataFrame:
    """Carrega os dados do arquivo CSV para um DataFrame do Pandas."""
    try:
        df = pd.read_csv(DATA_FILE_PATH)
        return df
    except FileNotFoundError:
        # Em um cenário real, poderíamos logar este erro
        raise HTTPException(
            status_code=500,
            detail="Arquivo de dados não encontrado. Verifique a configuração do servidor."
        )

@app.get(
    "/heatmap/{parameter}",
    tags=["Mapas de Calor"],
    summary="Gera um mapa de calor para um parâmetro específico.",
    responses={
        200: {
            "content": {"image/png": {}},
            "description": "Retorna a imagem do mapa de calor em formato PNG.",
        },
        404: {
            "description": "O parâmetro solicitado não existe.",
        },
        500: {
            "description": "Erro interno do servidor, como dados não encontrados."
        }
    }
)
async def get_heatmap(
    parameter: AvailableParameters = Path(
        ..., # ... significa que é um parâmetro obrigatório
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
    
    # O valor do enum é o nome da coluna no CSV (ex: "umidade")
    parameter_column_name = parameter.value

    # Gera a imagem do mapa de calor como bytes
    image_bytes = create_heatmap_from_scatter(df, parameter_column_name)

    # Retorna a imagem diretamente na resposta HTTP
    return StreamingResponse(iter([image_bytes]), media_type="image/png")

@app.get("/", tags=["Root"], summary="Verifica se a API está online.")
async def read_root():
    """Endpoint raiz para verificar a saúde da API."""
    return {"status": "ok", "message": "Bem-vindo à API do SpaceFarm!"}