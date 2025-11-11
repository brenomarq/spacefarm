from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, jwt
from . import crud, models, schemas, auth
from .database import get_db

# Define o "scheme" de autenticação. 
# tokenUrl aponta para o endpoint de login.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

async def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: AsyncSession = Depends(get_db)
) -> models.User:
    """
    Decodifica o token JWT, valida e retorna o usuário do banco de dados.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        if not auth.SECRET_KEY or not auth.ALGORITHM:
            raise Exception("Secret Key not implemented!")
        
        # Decodifica o token
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email = payload.get("sub")
        
        if not isinstance(email, str):
            raise credentials_exception
        
        if email is None:
            raise credentials_exception
        
        # Cria um schema TokenData para validação (opcional, mas boa prática)
        token_data = schemas.TokenData(email=email)
        
    except JWTError:
        raise credentials_exception
    
    # Busca o usuário no banco de dados
    if token_data.email is None:
        raise credentials_exception
    
    user = await crud.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
        
    return user