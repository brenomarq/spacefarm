from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static" / "heatmaps"
STATIC_DIR.mkdir(parents=True, exist_ok=True)

DEFAULT_GRID_RES = 200
DEFAULT_PADDING = 0.05
DEFAULT_METHOD = "cubic"