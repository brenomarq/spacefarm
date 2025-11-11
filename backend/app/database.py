from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
import os
from dotenv import load_dotenv

load_dotenv() # Carrega as variáveis do .env

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise Exception('A URL was not provided')

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
Base = declarative_base()

# Dependência para injeção de sessão nas rotas
async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()