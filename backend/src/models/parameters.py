from enum import Enum

class AvailableParameters(str, Enum):
    """Parâmetros disponíveis para a geração de mapas de calor."""
    UMIDADE = "umidade"
    TEMPERATURA = "temperatura"
    NPK = "npk"
    PH = "ph"