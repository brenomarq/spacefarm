from fastapi import FastAPI
from app.routers import heatmap

app = FastAPI(
    title="Agro Heatmap API",
    version="1.0.0",
    description="API para gerar mapas de calor agrícolas a partir de dados de estacas"
)

app.include_router(heatmap.router)

@app.get("/")
def root():
    return {"message": "Agro Heatmap API - OK"}