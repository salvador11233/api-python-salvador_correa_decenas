from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.
# Se crea Modelo de Usuarios
class Usuarios(AbstractUser):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    edad = models.IntegerField()
    activo = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    last_update = models.DateField(auto_now=True)

    # Encripta la constraseña
    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
    # verifica la contraseña
    def verificar_password(self, password):
        return check_password(password, self.password)

    def __str__(self):
        return f"{self.username} - {self.nombre} {self.apellido}"

# Se crea Modelo de producto
class Productos(models.Model):
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=10,decimal_places=2) 
    stock = models.PositiveBigIntegerField()
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

