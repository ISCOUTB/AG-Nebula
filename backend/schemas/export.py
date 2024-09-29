from pydantic import BaseModel

class ExportBase(BaseModel):
    exported_at: str
    file_path: str

class ExportCreate(ExportBase):
    pass

class Export(ExportBase):
    id: int
    user_id: int
    model_id: int

    class Config:
        orm_mode = True
