from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Union
from . import models, schemas, auth

async def get_user_by_email(db: AsyncSession, email: str) -> Union[models.User, None]:
    """Busca um usuário pelo email."""
    result = await db.execute(select(models.User).filter(models.User.email == email))
    return result.scalars().first()

async def create_user(db: AsyncSession, user: schemas.UserCreate) -> models.User:
    """Cria um novo usuário no banco de dados."""
    # Gera o hash da senha
    hashed_password = auth.get_password_hash(user.password)
    
    # Cria o objeto do modelo SQLAlchemy
    db_user = models.User(
        email=user.email,
        name=user.name,
        password_hash=hashed_password,
        role=user.role
    )
    
    # Adiciona e 'commita'
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user) # Recarrega o objeto para pegar o ID e created_at
    return db_user