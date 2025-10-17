from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from src.core.config import settings
from src.usuarios import models, schemas
from src.core.database import get_db

# Esta URL informa ao FastAPI qual endpoint o cliente deve usar para obter o token.
# O caminho é relativo ao prefixo do roteador.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/usuarios/login")

def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
) -> models.Usuario:
    """
    Decodifica o token JWT para obter o usuário atual.
    Esta função é uma dependência que pode ser usada para proteger endpoints.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
        email = str(email)
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = db.query(models.Usuario).filter(models.Usuario.email == token_data.email).first()
    if user is None:
        raise credentials_exception
        
    return user