from pydantic import BaseModel

class ModelMetricBase(BaseModel):
    metric_name: str
    metric_value: float

class ModelMetricCreate(ModelMetricBase):
    pass

class ModelMetric(ModelMetricBase):
    id: int
    model_id: int

    class Config:
        orm_mode = True
