from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta

from .. import schemas, crud, auth
from ..database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Autenticação"]
)

@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    db: AsyncSession = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    Endpoint de login. Recebe 'username' (usaremos como email) e 'password'.
    """
    # 1. Busca o usuário pelo email (que vem no campo 'username' do form)
    user = await crud.get_user_by_email(db, email=form_data.username)
    
    # 2. Verifica se o usuário existe e se a senha está correta
    if not user or not auth.verify_password(form_data.password, str(user.password_hash)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # 3. Cria o token de acesso
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    # 4. Retorna o token
    return {"access_token": access_token, "token_type": "bearer"}