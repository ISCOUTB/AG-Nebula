from pydantic import BaseModel
from typing import List
from app.schemas.variable_importance import VariableImportance

class ModelBase(BaseModel):
    model_type: str

class ModelCreate(ModelBase):
    pass

class Model(ModelBase):
    id: int
    user_id: int
    dataset_id: int
    created_at: str
    variables: List['VariableImportance'] = []  # Lista de importancia de variables asociadas al modelo
    

    class Config:
        orm_mode = True
