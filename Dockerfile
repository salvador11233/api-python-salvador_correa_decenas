# Descagamos la Imagen de Python 3.12 --> la ultima verción estable    
FROM python:3.12-slim
# Creamos directorio donde se almacenara la app
WORKDIR /app
# Copiamos nuestro archivo de requirements para las liebrerias utilizadas en nuestro proyecto 
COPY requirements.txt .
# Se instalan librerias del requirements 
RUN pip Install --no-cache-dir -r requirements.txt
# Se copia todo al contenedor
COPY . .
# El pueto que tendra el Django 
EXPOSE 8000
# Comando por a ejecutar por consola
CMD["python", "manage.py", "runserver","0.0.0.0:8000"]
