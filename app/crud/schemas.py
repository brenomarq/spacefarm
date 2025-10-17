from pydantic import BaseModel, EmailStr

class UsuarioBase(BaseModel):
    nome: str
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    senha: str

class Usuario(UsuarioBase):
    id: int

    class Config:
        orm_mode = True
