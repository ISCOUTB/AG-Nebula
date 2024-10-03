from fastapi import FastAPI, HTTPException, UploadFile, File
from typing import List
from pydantic import BaseModel
import pandas as pd  

app = FastAPI(
    title="Nebula API",
    description="API para gestionar usuarios, sus modelos y procesar archivos CSV para crear modelos de regresión o clasificación.",
    version="1.0.0",
    openapi_tags=[
        {
            "name": "user",
            "description": "Operaciones sobre usuarios en la API",
            "externalDocs": {"description": "Más información sobre usuarios", "url": "http://swagger.io"},
        },
        {
            "name": "model",
            "description": "Gestión de modelos asociados a los usuarios",
            "externalDocs": {"description": "Más información sobre los modelos", "url": "http://swagger.io"},
        },
    ],

)
users_db = {}
models_db = {}


# Esquemas 

    

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: str

class ModelBase(BaseModel):
    name: str
    predictor_variables: List[str]
    response_variable: str

class ModelCreate(ModelBase):
    pass

class Model(ModelBase):
    id: str
    created_at: str

class ModelResults(BaseModel):
    r_squared: float
    variable_importance: List[dict]
    model_type: str  

    class Config:
        protected_namespaces = ()  # Desactivamos la protección de namespaces en Pydantic


# Endpoints
## 1. Cargar archivos CSV
@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    try:
        # Leer el CSV omitiendo líneas
        df = pd.read_csv(file.file, on_bad_lines='skip', skip_blank_lines=True)

        
        df = df.fillna(value='missing_value')  

        # Convertir el DataFrame a un diccionario
        data = df.to_dict(orient="records") 

        return {"message": "Archivo procesado correctamente", "data": data}
    
    except pd.errors.ParserError as e:
        return {"error": f"Error procesando el archivo CSV: {str(e)}"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

    
@app.post("/select-variables-from-csv", tags=["model"], summary="Subir CSV y seleccionar variables")
async def select_variables_from_csv(file: UploadFile = File(...)):
    # Cargamos el archivo CSV
    try:
        df = pd.read_csv(file.file)
        columns = df.columns.tolist()  # Obtenemos los nombres de las columnas
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error procesando el archivo CSV: {e}")

    return {
        "message": "Archivo CSV cargado correctamente",
        "available_columns": columns
    }

@app.delete("/models/{model_id}", tags=["model"], summary="Eliminar un modelo")
async def delete_model(model_id: str):
    return {
        "message": f"Modelo con ID {model_id} eliminado exitosamente"
    }

@app.put("/users/{id}", tags=["user"], summary="Actualizar un usuario")
async def update_user(id: str, user: UserCreate):
    return {
        "message": f"Usuario con ID {id} actualizado exitosamente",
        "updated_data": user
    }


@app.get("/users", tags=["user"], summary="Obtener todos los usuarios", description="Devuelve una lista de todos los usuarios registrados.")
def get_users():
    return list(users_db.values())

@app.post("/users", tags=["user"], summary="Crear un nuevo usuario", description="Crea un nuevo usuario con la información proporcionada.")
def create_user(user: UserCreate):
    user_id = str(len(users_db) + 1)  # Generamos un ID sencillo
    users_db[user_id] = {"id": user_id, "name": user.name, "email": user.email}
    return users_db[user_id]

@app.get("/users/{id}", tags=["user"], summary="Obtener detalles de un usuario", description="Devuelve la información de un usuario específico por su ID.")
def get_user(id: str):
    user = users_db.get(id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@app.delete("/users/{id}", tags=["user"], summary="Eliminar un usuario", description="Elimina un usuario por su ID.")
def delete_user(id: str):
    user = users_db.pop(id, None)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"message": "Usuario eliminado exitosamente"}

# Métodos relacionados con modelos
@app.post("/users/{id}/models", tags=["model"], summary="Crear un modelo para un usuario")
def create_model(id: str, model: ModelCreate):
    user = users_db.get(id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    model_id = str(len(models_db) + 1)  # Generamos un ID sencillo
    models_db[model_id] = {"id": model_id, "user_id": id, "name": model.name}
    return models_db[model_id]

@app.delete("/users/{id}/models/{model_id}", tags=["model"], summary="Eliminar un modelo")
def delete_model(id: str, model_id: str):
    model = models_db.get(model_id)
    if not model or model["user_id"] != id:
        raise HTTPException(status_code=404, detail="Modelo no encontrado")
    
    models_db.pop(model_id)
    return {"message": "Modelo eliminado exitosamente"}