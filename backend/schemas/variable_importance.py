from pydantic import BaseModel

class VariableImportanceBase(BaseModel):
    variable_id: int
    importance_score: float

class VariableImportance(VariableImportanceBase):
    id: int
    model_id: int

    class Config:
        orm_mode = True
