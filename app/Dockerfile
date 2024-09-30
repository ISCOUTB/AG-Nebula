# Usa una imagen base de Python
FROM python:3.12

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo requirements.txt
COPY requirements.txt .

# Instala las dependencias en el contenedor
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente al contenedor
COPY . .

# Expone el puerto en el que correrá Uvicorn
EXPOSE 8010

# Ejecuta la aplicación FastAPI
CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8010",