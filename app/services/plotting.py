import matplotlib.pyplot as plt
from pathlib import Path
import pandas as pd
import numpy as np
from datetime import datetime

def generate_heatmap(grid_x, grid_y, grid_z, extent, df: pd.DataFrame, variable: str, save_dir: Path) -> Path:
    xmin, xmax, ymin, ymax = extent
    fig, ax = plt.subplots(figsize=(8, 6))
    img = ax.imshow(grid_z, origin="lower", extent=(xmin, xmax, ymin, ymax), aspect="auto")
    ax.scatter(df["x"], df["y"], s=30, edgecolor="black", linewidth=0.5, zorder=2)
    ax.set_title(f"Mapa de Calor - {variable}")
    ax.set_xlabel("X")
    ax.set_ylabel("Y")
    cbar = fig.colorbar(img, ax=ax)
    cbar.set_label(variable)
    plt.tight_layout()

    filename = f"heatmap_{variable}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
    filepath = save_dir / filename
    plt.savefig(filepath, dpi=300)
    plt.close(fig)
    return filepath