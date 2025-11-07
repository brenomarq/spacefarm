# Em src/auth/dependencies.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from src.core.config import settings
from src.usuarios import models, schemas
from src.core.database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/usuarios/login")

def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
) -> models.Usuario:
    """
    Dependência de segurança:
    1. Recebe o token do cabeçalho.
    2. Decodifica e valida o token.
    3. Busca o usuário no banco de dados.
    4. Retorna o objeto do usuário ou lança uma exceção 401.
    """
    
    # 2. O Erro Padrão
    # Definimos uma exceção padrão para qualquer falha de autenticação.
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # 3. Decodificação
        # Tenta decodificar o token usando nossa chave secreta e algoritmo.
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        
        # 4. Extração do Payload
        # Lemos o email que salvamos no campo "sub" (subject) ao criar o token.
        email = payload.get("sub")
        if not isinstance(email, str):
            raise credentials_exception
        if email is None:
            # Se não houver "sub", o token é inválido.
            raise credentials_exception
            
        # Validamos o formato do email usando nosso schema (boa prática)
        token_data = schemas.TokenData(email=email)
        
    except JWTError:
        # Se o jwt.decode falhar (token expirado, assinatura inválida),
        # lançamos o erro.
        raise credentials_exception
    
    # 5. Verificação no Banco de Dados
    # O token é válido, mas o usuário ainda existe?
    user = db.query(models.Usuario).filter(models.Usuario.email == token_data.email).first()
    
    if user is None:
        # Se o usuário não for encontrado no DB (ex: foi deletado),
        # as credenciais não são mais válidas.
        raise credentials_exception
        
    # 6. Sucesso
    # O token é válido e o usuário existe. Retornamos o objeto do usuário.
    return user