import numpy as np
from scipy.interpolate import griddata
from typing import Tuple
import pandas as pd

def make_grid(df: pd.DataFrame, grid_res: int = 200, padding: float = 0.05) -> Tuple[np.ndarray, np.ndarray, tuple]:
    xmin, xmax = df["x"].min(), df["x"].max()
    ymin, ymax = df["y"].min(), df["y"].max()
    dx, dy = xmax - xmin, ymax - ymin
    xmin -= padding * dx
    xmax += padding * dx
    ymin -= padding * dy
    ymax += padding * dy

    xi = np.linspace(xmin, xmax, grid_res)
    yi = np.linspace(ymin, ymax, grid_res)
    grid_x, grid_y = np.meshgrid(xi, yi)
    return grid_x, grid_y, (xmin, xmax, ymin, ymax)


def idw_interpolate(points, values, grid_x, grid_y, power=2.0):
    xi_flat = grid_x.ravel()
    yi_flat = grid_y.ravel()
    d = np.sqrt((xi_flat[:, None] - points[:, 0])**2 + (yi_flat[:, None] - points[:, 1])**2)
    d[d == 0] = 1e-12
    w = 1 / (d ** power)
    z_flat = (w * values[None, :]).sum(axis=1) / w.sum(axis=1)
    return z_flat.reshape(grid_x.shape)


def interpolate(df: pd.DataFrame, value_col: str, method: str = "cubic", grid_res: int = 200, padding: float = 0.05):
    points = df[["x", "y"]].values
    values = df[value_col].values
    grid_x, grid_y, extent = make_grid(df, grid_res, padding)

    if method == "idw":
        grid_z = idw_interpolate(points, values, grid_x, grid_y)
    else:
        grid_z = griddata(points, values, (grid_x, grid_y), method=method)
        if np.any(np.isnan(grid_z)):
            grid_z = np.where(np.isnan(grid_z), griddata(points, values, (grid_x, grid_y), method="nearest"), grid_z)

    return grid_x, grid_y, grid_z, extent