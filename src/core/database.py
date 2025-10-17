from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base # <-- Caminho novo

# O banco será um arquivo chamado 'usuarios.db' na raiz do projeto
DATABASE_URL = "sqlite:///./usuarios.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Função de dependência para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()