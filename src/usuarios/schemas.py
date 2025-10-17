from pydantic import BaseModel, EmailStr, ConfigDict # <-- Importe ConfigDict

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