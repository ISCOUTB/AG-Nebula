from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import pandas as pd
import model_utils

app = FastAPI()

# Variable global para almacenar el DataFrame
data_frame = None

# Modelo para seleccionar características y etiqueta
class FeaturesLabel(BaseModel):
    features: list[str]
    label: str

# Cargar un archivo CSV
@app.post("/upload-csv/")
async def upload_csv(file: UploadFile = File(...)):
    global data_frame
    try:
        data_frame = model_utils.load_csv(file.file)
        return {"message": "Archivo CSV cargado correctamente."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al cargar el archivo CSV: {e}")

# Obtener cabecera y primeras 5 filas
@app.get("/data-preview/")
async def data_preview():
    if data_frame is None:
        raise HTTPException(status_code=400, detail="No se ha cargado ningún archivo CSV.")
    
    return model_utils.get_header_and_first_rows(data_frame)

# Seleccionar características y etiqueta
@app.post("/select-features-label/")
async def select_features_label(features_label: FeaturesLabel):
    global data_frame
    if data_frame is None:
        raise HTTPException(status_code=400, detail="No se ha cargado ningún archivo CSV.")
    
    features = features_label.features
    label = features_label.label

    # Validar si las características y la etiqueta existen en el DataFrame
    for feature in features:
        if feature not in data_frame.columns:
            raise HTTPException(status_code=400, detail=f"La característica '{feature}' no existe en el DataFrame.")
    if label not in data_frame.columns:
        raise HTTPException(status_code=400, detail=f"La etiqueta '{label}' no existe en el DataFrame.")
    
    return {"message": "Características y etiqueta seleccionadas correctamente."}

# Análisis de modelo
@app.post("/analyze-model/")
async def analyze_model(features_label: FeaturesLabel):
    global data_frame
    if data_frame is None:
        raise HTTPException(status_code=400, detail="No se ha cargado ningún archivo CSV.")
    
    label = features_label.label

    # Llamar a la función para analizar la variable de respuesta
    analysis_result = model_utils.check_classification_or_regression(data_frame, label)
    
    return analysis_result

# Entrenar el modelo con ajuste de hiperparámetros
@app.post("/train-model/")
async def train_model(features_label: FeaturesLabel, model_type: str):
    global data_frame
    if data_frame is None:
        raise HTTPException(status_code=400, detail="No se ha cargado ningún archivo CSV.")
    
    features = features_label.features
    label = features_label.label

    # Entrenar el modelo utilizando la función de model_utils
    model_result = model_utils.train_model(data_frame, features, label, model_type)
    
    return model_result
