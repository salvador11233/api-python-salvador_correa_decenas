from rest_framework import serializers
from .models import Usuarios, Productos

class UsuariosSerializers(serializers.ModelSerializers):
    class Meta:
        model = Usuarios
        fields = '__all__'

class ProductosSerializers(serializers.ModelSerializers):
    class Meta:
        model = Productos
        fields = '__all__'