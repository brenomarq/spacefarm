import pandas as pd
from typing import List
from app.models.heatmap_request import TalhaData

def to_dataframe(data: List[TalhaData]) -> pd.DataFrame:
    """
    Converte a lista de TalhaData em DataFrame e valida colunas.
    """
    df = pd.DataFrame([d.model_dump() for d in data])
    required = {"x", "y", "umidade", "temperatura"}
    if not required.issubset(df.columns):
        raise ValueError(f"Colunas obrigatórias ausentes: {required}")
    return df