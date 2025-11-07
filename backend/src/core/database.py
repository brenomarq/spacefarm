from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base # <-- Caminho novo

# O banco será um arquivo chamado 'usuarios.db' na raiz do projeto
DATABASE_URL = "sqlite:///./usuarios.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """
    Dependência do FastAPI para gerenciar a sessão do banco de dados.
    Isso garante que a sessão seja aberta e fechada corretamente
    para cada requisição.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()