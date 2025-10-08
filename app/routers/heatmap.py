from fastapi import APIRouter, HTTPException
from app.models.heatmap_request import HeatmapRequest
from app.services.data_loader import to_dataframe
from app.services.interpolation import interpolate
from app.services.plotting import generate_heatmap
from app.core.config import STATIC_DIR
from app.core.logger import get_logger

router = APIRouter(prefix="/heatmap", tags=["heatmap"])
logger = get_logger(__name__)

@router.post("/")
def create_heatmap(request: HeatmapRequest):
    try:
        df = to_dataframe(request.data)
        grid_x, grid_y, grid_z, extent = interpolate(
            df, value_col=request.variable, method=request.method, grid_res=request.grid_res
        )
        output_path = generate_heatmap(grid_x, grid_y, grid_z, extent, df, request.variable, STATIC_DIR)
        logger.info(f"Mapa de calor salvo em: {output_path}")
        return {"message": "Mapa de calor gerado com sucesso", "file_path": str(output_path)}
    except Exception as e:
        logger.exception("Erro ao gerar mapa de calor")
        raise HTTPException(status_code=500, detail=str(e))