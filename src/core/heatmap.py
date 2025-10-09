import matplotlib
matplotlib.use('Agg')  # <-- Adicione esta linha! Deve ser a primeira coisa relacionada a matplotlib.

import io
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt # <-- Este import deve vir DEPOIS de matplotlib.use('Agg')
import seaborn as sns
from scipy.interpolate import griddata
from typing import Literal

# Define um tipo para os parâmetros válidos, para melhorar a legibilidade e segurança
HeatmapParameter = Literal["umidade", "temperatura", "npk", "ph"]

def create_heatmap_from_scatter(
    df: pd.DataFrame,
    parameter: HeatmapParameter,
    grid_resolution: int = 100,
    cmap: str = "viridis"
) -> bytes:
    """
    Gera uma imagem de mapa de calor a partir de dados de pontos dispersos.

    Args:
        df (pd.DataFrame): DataFrame com colunas 'x', 'y' e o parâmetro a ser plotado.
        parameter (HeatmapParameter): A coluna de dados para o mapa de calor.
        grid_resolution (int): A resolução da grade para interpolação.
        cmap (str): O mapa de cores a ser usado pelo Seaborn.

    Returns:
        bytes: A imagem do mapa de calor em formato PNG como um objeto de bytes.
    """
    points = df[['x', 'y']].values
    values = df[parameter].values

    # Cria uma grade regular de pontos para a interpolação
    grid_x, grid_y = np.mgrid[
        df['x'].min():df['x'].max():complex(0, grid_resolution),
        df['y'].min():df['y'].max():complex(0, grid_resolution)
    ]

    # Interpola os dados dispersos para a grade
    grid_z = griddata(points, values, (grid_x, grid_y), method='cubic')

    # Cria o gráfico
    fig, ax = plt.subplots(figsize=(10, 8))
    sns.heatmap(
        grid_z.T,
        xticklabels=False,
        yticklabels=False,
        cmap=cmap,
        ax=ax,
        cbar_kws={'label': parameter.capitalize()} # Adiciona um rótulo à barra de cores
    )
    ax.set_title(f"Mapa de Calor de {parameter.capitalize()}", fontsize=16)
    ax.set_xlabel("Coordenada X")
    ax.set_ylabel("Coordenada Y")
    
    # Inverte o eixo Y para que a origem (0,0) fique no canto inferior esquerdo
    ax.invert_yaxis()

    # Salva a imagem em um buffer de memória em vez de um arquivo
    img_buffer = io.BytesIO()
    fig.savefig(img_buffer, format='png', bbox_inches='tight')
    plt.close(fig)  # Fecha a figura para liberar memória
    img_buffer.seek(0)

    return img_buffer.getvalue()