from pydantic import BaseModel
from typing import List
from backend.schemas.model import Model
import sys
sys.path.append('/path/to/backend')

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
