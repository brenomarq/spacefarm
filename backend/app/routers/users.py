from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from .. import schemas, crud, models, dependencies
from ..database import get_db

router = APIRouter(
    prefix="/users",
    tags=["Usuários"]
)

@router.post("/", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
async def create_user(
    user: schemas.UserCreate, 
    db: AsyncSession = Depends(get_db)
):
    """
    Cria um novo usuário (endpoint de "sign up").
    """
    # Verifica se o usuário já existe
    db_user = await crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado."
        )
    
    # Cria o usuário
    return await crud.create_user(db=db, user=user)

@router.get("/me", response_model=schemas.User)
async def read_users_me(
    current_user: models.User = Depends(dependencies.get_current_user)
):
    """
    Endpoint protegido que retorna os dados do usuário atualmente logado.
    """
    # A dependência `get_current_user` já fez todo o trabalho de
    # pegar o token, validar e buscar o usuário no banco.
    # Se chegou até aqui, o usuário é válido.
    return current_user