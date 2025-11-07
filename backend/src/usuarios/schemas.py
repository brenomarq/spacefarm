from pydantic import BaseModel, EmailStr, ConfigDict # <-- Importe ConfigDict
from typing import Optional

class UsuarioBase(BaseModel):
    nome: str
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    senha: str

class Usuario(UsuarioBase):
    id: int

    # Sintaxe antiga (substitua esta parte):
    # class Config:
    #     orm_mode = True

    # Sintaxe nova do Pydantic V2:
    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    """
Recipiente para o token de acesso retornado ao usuário.
    """
    access_token: str
    token_type: str


class TokenData(BaseModel):
    """
Define o conteúdo (payload) esperado dentro do token JWT.
    """
    email: Optional[str] = None