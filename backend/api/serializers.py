from rest_framework import serializers
from .models import Usuarios, Productos

class UsuariosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'
        #Oculta la contraseña
        extra_kwargs = {'password':{'write_only':True}}

class ProductosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'