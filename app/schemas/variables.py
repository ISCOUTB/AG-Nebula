from pydantic import BaseModel
from typing import List

class VariableBase(BaseModel):
    name: str
    is_predictor: bool
    is_target: bool

class VariableCreate(VariableBase):
    dataset_id: int

class Variable(VariableBase):
    id: int
    dataset_id: int

    class Config:
        orm_mode = True
