import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.svm import SVC, SVR
from sklearn.metrics import accuracy_score, mean_squared_error, classification_report, r2_score
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.svm import SVC, SVR
from sklearn.metrics import mean_squared_error, classification_report, r2_score, accuracy_score


# Cargar CSV y devolver DataFrame
def load_csv(file) -> pd.DataFrame:
    df = pd.read_csv(file, on_bad_lines='skip', skip_blank_lines=True)
    df = df.fillna(value='missing_value') 
    return df

# Preprocesamiento de la data para el entrenamiento de los datos
def preprocess_for_training(df: pd.DataFrame) -> pd.DataFrame:
    X_processed = pd.DataFrame() 
    
    for col in df.columns:
        # Convierte columnas categóricas en códigos numéricos
        if df[col].dtype.name == 'category' or df[col].dtype == 'object':
            X_processed[col] = df[col].astype('category').cat.codes
        else:
            X_processed[col] = df[col]
            
    return X_processed

# Función que determina si el dataframe es de clasificación o de regresión
def check_classification_or_regression(df: pd.DataFrame, response_variable: str):
    # Diccionario con descripciones breves para cada modelo
    model_descriptions = {
        "LinearRegression": "A linear regression model is a linear approach to modeling the relationship between a scalar response (or dependent variable) and one or more explanatory variables (or independent variables).",
        "LogisticRegression": "Logistic regression is a statistical model that in its basic form uses a logistic function to model a binary dependent variable, although many more complex extensions exist.",
        "DecisionTreeClassifier": "A classification model that uses a decision tree structure to make predictions based on feature values.",
        "RandomForestClassifier": "An ensemble method that combines multiple decision trees to improve accuracy and reduce overfitting in classification tasks.",
        "SVC": "Support Vector Classification that separates classes with a hyperplane and can use different kernels for complex boundaries.",
        "DecisionTreeRegressor": "A regression model that uses a decision tree to predict continuous values by partitioning the data.",
        "RandomForestRegressor": "An ensemble of decision trees for regression that enhances accuracy and reduces overfitting.",
        "SVR": "Support Vector Regression that predicts continuous outputs using support vector machines with various kernels."
    }

    # Verificar si la columna existe en el DataFrame
    if response_variable not in df.columns:
        return {"error": f"La variable de respuesta '{response_variable}' no existe en el DataFrame."}

    # Verificar el número de valores únicos
    unique_values = df[response_variable].nunique()
    result = {"variable_type": "", "possible_models": []}

    # Determinar si es clasificación o regresión
    if unique_values <= 20:
        result["variable_type"] = "classification"
        result["possible_models"] = [{"name": model, "description": model_descriptions[model]}
                                     for model in ["LogisticRegression", "DecisionTreeClassifier", 
                                                   "RandomForestClassifier", "SVC"]]
    elif pd.api.types.is_numeric_dtype(df[response_variable]):
        is_integer = df[response_variable].apply(lambda x: float(x).is_integer()).all()
        if is_integer and unique_values <= 20:
            result["variable_type"] = "classification"
            result["possible_models"] = [{"name": model, "description": model_descriptions[model]}
                                         for model in ["LogisticRegression", "DecisionTreeClassifier", 
                                                       "RandomForestClassifier", "SVC"]]
        else:
            result["variable_type"] = "regression"
            result["possible_models"] = [{"name": model, "description": model_descriptions[model]}
                                         for model in ["LinearRegression", "DecisionTreeRegressor", 
                                                       "RandomForestRegressor", "SVR"]]
    else:
        result["variable_type"] = "classification"
        result["possible_models"] = [{"name": model, "description": model_descriptions[model]}
                                     for model in ["LogisticRegression", "DecisionTreeClassifier", 
                                                   "RandomForestClassifier", "SVC"]]

    return result


# Entrenamiento del modelo
def train_model(df: pd.DataFrame, features: list[str], label: str, model_type: str):
    # Preprocesar los datos categórico llamando la función realizada para ello
    X_processed = preprocess_for_training(df)

    # Definir X e y usando el DataFrame procesado
    X = X_processed[features]
    y = X_processed[label]

    # Dividir el conjunto de datos en entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Determinar automáticamente si es un problema de clasificación o regresión
    result = check_classification_or_regression(df, label)
    problem_type = result["variable_type"]

    # Definir los hiperparámetros para cada tipo de modelo según si es clasificación o regresión
    if problem_type == "regression":
        if model_type == "RandomForestRegressor":
            model = RandomForestRegressor(random_state=42)
            param_grid = {
                "n_estimators": [100, 200, 400],
                "max_depth": [10, 15, 20, None],
                "min_samples_split": [2, 5, 10]
            }
        elif model_type == "LinearRegression":
            model = LinearRegression()
            param_grid = {}  # Sin búsqueda de hiperparámetros para regresión lineal
        elif model_type == "DecisionTreeRegressor":
            model = DecisionTreeRegressor(random_state=42)
            param_grid = {
                "max_depth": [10, 20, 30, None],
                "min_samples_split": [2, 5, 10]
            }
        elif model_type == "SVR":
            model = SVR()
            param_grid = {
                "C": [0.1, 1, 10],
                "kernel": ["linear", "rbf"]
            }
        else:
            return {"error": "Modelo de regresión no soportado"}

    elif problem_type == "classification":
        if model_type == "RandomForestClassifier":
            model = RandomForestClassifier(random_state=42)
            param_grid = {
                "n_estimators": [100, 200, 400],
                "max_depth": [10, 15, 20, None],
                "min_samples_split": [2, 5, 10]
            }
        elif model_type == "LogisticRegression":
            model = LogisticRegression(max_iter=1000)
            param_grid = {
                "C": [0.1, 1, 10],
                "solver": ["liblinear", "saga"]
            }
        elif model_type == "DecisionTreeClassifier":
            model = DecisionTreeClassifier(random_state=42)
            param_grid = {
                "max_depth": [10, 20, 30, None],
                "min_samples_split": [2, 5, 10]
            }
        elif model_type == "SVC":
            model = SVC()
            param_grid = {
                "C": [0.1, 1, 10],
                "kernel": ["linear", "rbf"]
            }
        else:
            return {"error": "Modelo de clasificación no soportado"}

    else:
        return {"error": "Error detectando el tipo de problema"}

    # Aplicar GridSearchCV para búsqueda de hiperparámetros (si aplica)
    if param_grid:
        grid_search = GridSearchCV(model, param_grid, cv=5, scoring="neg_mean_squared_error" if problem_type == "regression" else "accuracy", verbose=1)
        grid_search.fit(X_train, y_train)
        best_model = grid_search.best_estimator_
    else:
        # Si no hay búsqueda de hiperparámetros (ej. LinearRegression), entrenar directamente
        best_model = model
        best_model.fit(X_train, y_train)

    # Hacer predicciones en el conjunto de prueba
    y_pred_test = best_model.predict(X_test)
    y_pred_train = best_model.predict(X_train)
    y_pred_full = best_model.predict(X)

    # Calcular métricas según el tipo de problema
    if problem_type == "regression":
        mse_test = mean_squared_error(y_test, y_pred_test)
        r2_test = r2_score(y_test, y_pred_test)
        mse_train = mean_squared_error(y_train, y_pred_train)
        r2_train = r2_score(y_train, y_pred_train)
        mse_full = mean_squared_error(y, y_pred_full)
        r2_full = r2_score(y, y_pred_full)
        metric_result = {
            "test_metrics": {"mse": mse_test, "r2_score": r2_test},
            "train_metrics": {"mse": mse_train, "r2_score": r2_train},
            "full_metrics": {"mse": mse_full, "r2_score": r2_full}
        }
    else:  # classification
        accuracy = accuracy_score(y_test, y_pred_test)
        report = classification_report(y_test, y_pred_test, output_dict=True)
        metric_result = {
            "accuracy": accuracy,
            "classification_report": report
        }
    
    # Obtener importancia de características (solo para modelos que las soportan)
    if hasattr(best_model, "feature_importances_"):
        feature_importances = best_model.feature_importances_
        feature_importance_df = pd.DataFrame({
            "Feature": X.columns,
            "Importance": feature_importances
        }).sort_values(by="Importance", ascending=False)
        
    else:
        feature_importance_df = None

    # Retornar las métricas, predicciones y la importancia de características (si aplica)
    return {
        "best_params": grid_search.best_params_ if param_grid else "No grid search",
        "metrics": metric_result,
        "predictions": {
            "y_test": y_test.tolist(),
            "y_pred_test": y_pred_test.tolist()
        },
        "feature_importance": feature_importance_df.to_dict(orient="records") if feature_importance_df is not None else "No feature importances"
    }
