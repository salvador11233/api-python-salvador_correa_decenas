from rest_framework import serializers
from .models import Usuarios, Productos

class UsuariosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class ProductosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'