from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column # <-- Importe Mapped e mapped_column
from src.core.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    # A sintaxe nova usa anotações de tipo, que o linter entende perfeitamente.
    # A parte "Mapped[str]" diz ao linter: "Este atributo em uma instância será uma string".
    # A parte "mapped_column(...)" configura o SQLAlchemy, como o "Column(...)" fazia antes.

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nome: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    senha: Mapped[str] = mapped_column(String, nullable=False)