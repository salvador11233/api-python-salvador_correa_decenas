Examen Práctico Backend (Python)

# Descripción

Aplicación fullstack con Django REST Framework (backend) y React + Vite (frontend) desplegada mediante Docker.

Permite autenticar usuarios mediante JWT y realizar operaciones CRUD sobre productos y usuarios.
Repositorio: https://github.com/salvador11233/api-python-salvador_correa_decenas
**Usuario de pruebas:** 
Username= *Salvador*
Password= *S123R*


# Tecnologías utilizadas
**Backend**
•	Python 3.12
•	Django 5.x
•	Django REST Framework
•	Django CORS Headers
•	python-dotenv
•	JWT (SimpleJWT)
**Frontend**
•	React + Vite
•	TailwindCSS
•	ag-Grid
•	React Router
•	Lucide Icons
**Infraestructura**
•	Docker & Docker Compose
•	AWS EC2 (Ubuntu 24.04)

# ¿Cómo correr el proyecto?

1.	Instalar a Docker de su sitio oficial: https://www.docker.com/products/docker-desktop

2.	Se ejecuta y se deja seleccionados las dos opciones, se da en siguiente.

3.	Se comenzará a instalar y cuando termine solicitara reiniciar el equipo.
4.	Aceptamos los términos y condiciones.

5.	Iniciará, donde ya lo podemos usar.

6.	Clonar el repositorio
	git clone https://github.com/salvador11233/api-python-salvador_correa_decenas.git
	cd api-python-salvador_correa_decenas
	
7.	Creamos los archivos .env

**Backend (/backend/.env)**
DEBUG=TRUE
DJANGO_ALLOWED_HOST=http://localhost:8000
FRONTEND_URL=http://localhost:5173

**Frontend (/frontend/.env)**
VITE_API_URL=http://localhost:8000

8.	Construimos y levantamos los contenedores
**docker-compose up -d --build**
Esto levantará dos servicios:
•	backend: en http://localhost:8000
•	frontend: en http://localhost:5173

# ¿Cómo levantar el entorno local sin Docker?
**Backend**
1.	cd backend
2.	pip install -r requirements.txt
3.	python manage.py migrate
4.	python manage.py runserver

**Frontend**
1.	cd ../frontend
2.	npm install
3.	npm run dev

# Comandos de prueba para endpoints con postman
**Autenticación**

POST http://localhost:8000/api/token/
{
  "username": "Salvador",
  "password": "S123R"
}

**Obtener productos**

GET http://localhost:8000/api/productos/

**Crear producto**

POST http://localhost:8000/api/productos/
Headers: Authorization: Bearer <*TOKEN*>

Body:
`{
  "nombre": " Multimetro Stern",
  "precio": 1000,
  "stock": 5
}`

# Historial de commits

Cada commit debe tener un mensaje claro:
*CO*: Correción
*ME*: Mejora
*Nvo*: Nuevos
*AWS*: Configuraciones de la nube
1.	Initial commit: Se crea proyecto
2.	Requerimientos_Iniciales: Se configura y crean los archivos principales del proyecto, donde se se configura el dockerfile, su orquestador, los requerimientos del proyecto y el .env
3.	CO: Correción en el Dockerfile: Se realizan correcciones en el dockerfile, donde hubo errores gramaticales
4.	Nvo: Se instala Django: Se crea el proyecto de Django en el contenedor, son sus configuraciones
5.	Nvo: Se añade archivos de API: Se crean los archivo necesarios para la API REST
6.	Nvo: Se añade Modelos: Se añade Modelos de usuarios y productos en la REST API
7.	ME: Se define aplicación y se realiza migraciones: Se definen aplicaciones Rest Fremework y se aplica la API creada para su llamado, además se realizan migraciones, para BD
8.	Nvo: Serialización y vista: Se crea la serialización para conversión a JSON y se crea las vista necesarias para el CRUD para la REST API, GET, POST, PUT, DELETE
9.	Me: Actualización de Urls: Se añaden y se actualiza las Urls para poder acceder al EndPoint
10.	CO: Correción en serializers: Se realiza corrección en el Serializers, se tenia una s de más
11.	Nvo: Implementacion JWT: Se añade la autentificación JWT, con el refresh y creación del token
12.	Nvo: Se crea frontend en el proyecto: Se incorpora React en el proyecto para poder consumir Backend, se incluye en otro contenedor y se relaciona en el orquestado
13.	Nvo: Se completa Front: Se completa los componentes del front, además se agrega contraseña al modelo de usuario
14.	Nvo: Se implementa CorsHeader y se añade hook: Se instala el corsheader en el back para que el front pueda hacer peticiones y se añade hook para generar token
15.	Final: CRUD Completo: Se concluye con el Backend y con el consumo de la API con un Frontend básico
16.	Me: Se realiza correcíón del node_modules: Se contaba con un doble duplicado de la carpeta Node_modules, se realiza corrección
17.	Aws: Configuración .env: Se realiza configuración para que funcione en la nube de aws
18.	AWS: Python donet: Falta la paquetería para el .ENV 
19.	CO: Corrección del modelo y descripción README: Se añade descripción al README y se realiza corrección en el modelo para el guardado

# Demo funcional 
**Demo FRONT**: http://18.191.163.116:5173

**API BACK**: http://18.191.163.116:8000/api/



