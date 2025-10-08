from pydantic import BaseModel, Field, field_validator
from typing import Literal, List

class TalhaData(BaseModel):
    x: float
    y: float
    umidade: float
    temperatura: float

class HeatmapRequest(BaseModel):
    data: List[TalhaData] = Field(..., description="Lista de estacas com dados")
    variable: Literal["umidade", "temperatura"] = Field(..., description="Variável a ser mapeada")
    method: Literal["linear", "nearest", "cubic", "idw"] = "cubic"
    grid_res: int = 200

    @field_validator("grid_res")
    def check_grid_res(cls, value):
        if value < 10 or value > 2000:
            raise ValueError("grid_res deve estar entre 10 e 2000")
        
        return value


