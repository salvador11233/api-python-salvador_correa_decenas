from django.db import models

# Create your models here.
# Se crea Modelo de Usuarios
class Usuarios(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    edad = models.IntegerField()
    activo = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    last_update = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.apellido} {self.apellido}"

# Se crea Modelo de producto
class Productos(models.Model):
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=10,decimal_places=2) 
    stock = models.PositiveBigIntegerField()
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

