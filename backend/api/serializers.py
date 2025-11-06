from rest_framework import serializers
from .models import Usuarios, Productos

class UsuariosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'
        #Oculta la contraseña
        extra_kwargs = {'password':{'write_only':True, 'required':False, 'allow_blank':True}}

    def update(self, instance, validated_data):
        password = validated_data.pop('password',None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class ProductosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'