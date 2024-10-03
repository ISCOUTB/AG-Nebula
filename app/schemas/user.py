from pydantic import BaseModel
from typing import List
from app.schemas.model import Model


class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    models: List['Model'] = []  # Lista de modelos asociados al usuario

    class Config:
        orm_mode = True
