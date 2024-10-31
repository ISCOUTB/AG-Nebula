from pydantic import BaseModel

class DatasetBase(BaseModel):
    name: str

class DatasetCreate(DatasetBase):
    pass

class Dataset(DatasetBase):
    id: int
    user_id: int
    uploaded_at: str
    file_path: str

    class Config:
        orm_mode = True
