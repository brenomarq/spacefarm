from fastapi import FastAPI
from .routers import users, auth

app = FastAPI(
    title="SpaceFarm API",
    description="API para gerenciamento de fazenda e medições de solo.",
    version="0.1.0"
)

# --- Incluir Roteadores ---
# Adiciona os endpoints de autenticação (ex: /auth/token)
app.include_router(auth.router) 
# Adiciona os endpoints de usuários (ex: /users/, /users/me)
app.include_router(users.router)

# --- Endpoint Raiz (Health Check) ---
@app.get("/")
async def root():
    """
    Endpoint raiz para verificação de saúde da API.
    """
    return {"message": "Welcome to SpaceFarm API!"}