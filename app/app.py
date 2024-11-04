from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import model_utils

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Origen de tu aplicación React
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los headers
)

data_frame = None

# Modelo para seleccionar características y etiqueta
class FeaturesLabel(BaseModel):
    features: list[str]
    label: str

selected_features = []
selected_label = ''

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
    
    return model_utils.preprocess_and_get_first_rows(data_frame)

# Seleccionar features y label
@app.post("/select-features-label/")
async def select_features_label(features_label: FeaturesLabel):
    global selected_features, selected_label
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
    
    # Asignar las características y etiqueta seleccionadas
    selected_features = features
    selected_label = label
    return {"message": "Características y etiqueta seleccionadas correctamente."}

# Análisis de modelo
@app.post("/analyze-model/")
async def analyze_model():
    global selected_features, selected_label
    if not selected_features or not selected_label:
        raise HTTPException(status_code=400, detail="Las características y la etiqueta no han sido seleccionadas.")
    
    # Llamar a la función para analizar la variable de respuesta
    analysis_result = model_utils.check_classification_or_regression(data_frame, selected_label)
    
    return analysis_result

# Entrenar el modelo con ajuste de hiperparámetros
@app.post("/train-model/")
async def train_model_endpoint(model_type: str):
    global data_frame, selected_features, selected_label
    if data_frame is None:
        raise HTTPException(status_code=400, detail="No se ha cargado ningún archivo CSV.")

    # Verificar si se han seleccionado las características y la etiqueta
    if not isinstance(selected_features, list) or not isinstance(selected_label, str):
        raise HTTPException(status_code=400, detail="Las características y la etiqueta no se han seleccionado correctamente.")
    
    try:
        # Imprimir los valores seleccionados para depuración
        print("Características seleccionadas:", selected_features)
        print("Etiqueta seleccionada:", selected_label)

        # Entrenar el modelo utilizando la función de model_utils
        model_result = model_utils.train_model(data_frame, selected_features, selected_label, model_type)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el entrenamiento del modelo: {str(e)}")

    # Formatear y devolver los resultados del entrenamiento
    return {
        "Mejores parámetros": model_result.get("best_params"),
        "Métricas": model_result.get("metrics"),
        "Predicciones": {
            "y_test": model_result.get("predictions").get("y_test"),
            "y_pred_test": model_result.get("predictions").get("y_pred_test")
        },
        "Importancia de características": model_result.get("feature_importance")
    }
