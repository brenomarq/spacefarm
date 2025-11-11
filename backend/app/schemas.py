from pydantic import BaseModel, EmailStr
from typing import Literal, Union
from datetime import datetime

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Union[str, None] = None

# --- User Schemas ---
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: Literal['ADMIN', 'FARMER'] = 'FARMER'

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True # Novo nome para orm_mode no Pydantic v2