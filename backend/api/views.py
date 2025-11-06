from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Productos, Usuarios
from .serializers import ProductosSerializers, UsuariosSerializers

# Acciones de Usuario sin ID 
class UsuarioLista(APIView):
    # Todos los metodos bloqueados
    permission_classes = [IsAuthenticated]
    # Obetenemos Todos los usuarios --> SELECT
    def get(self, request):
        usuarios = Usuarios.objects.all()
        serializer = UsuariosSerializers(usuarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Damos de alta a los usuarios --> INSERT
    def post(self, request):
        serializer = UsuariosSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Acciones de Usaurio por ID    
class UsuarioDetalle(APIView):
    # Todos los metoso bloqueados
    permission_classes = [IsAuthenticated]
    # Obtenemos un usuario por ID --> Busqueda por ID --> SELECT con WHERE
    def get(self, request, pk):
        usuario = get_object_or_404(Usuarios, pk=pk)
        serializer = UsuariosSerializers(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Actualización del usuario --> Update
    def put(self, request, pk):
        usuario = get_object_or_404(Usuarios, pk=pk)
        serializer = UsuariosSerializers(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Eliminación del usuario --> Delete
    def delete(self, request, pk):
        usuario = get_object_or_404(Usuarios, pk=pk)
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Acciones de Producto sin ID 
class ProductoLista(APIView):
        # Get Publico
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()] 
    # Obetenemos Todos los prodcutos --> SELECT
    def get(self, request):
        productos = Productos.objects.all()
        serializer = ProductosSerializers(productos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Damos de alta a los productos --> INSERT
    def post(self, request):
        serializer = ProductosSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Acciones de Producto por ID    
class ProductoDetalle(APIView):
    # Get ID publico
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    # Obtenemos un producto por ID --> Busqueda por ID --> SELECT con WHERE
    def get(self, request, pk):
        producto = get_object_or_404(Productos, pk=pk)
        serializer = ProductosSerializers(producto)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Actualización del producto --> Update
    def put(self, request, pk):
        producto = get_object_or_404(Productos, pk=pk)
        serializer = ProductosSerializers(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Eliminación del producto --> Delete
    def delete(self, request, pk):
        producto = get_object_or_404(Productos, pk=pk)
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# Para inicio de siseión con los usuarios registrados
class LoginUsuariosView(APIView):
       def post(self, request):
        nombre = request.data.get("nombre")
        password = request.data.get("password")

        try:
            usuario = Usuarios.objects.get(nombre=nombre, activo=True)
        except Usuarios.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        if not usuario.verificar_password(password):
            return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Se hace puente con el modelo User de Django
        usuario_temp, _ = User.objects.get_or_create(
            username=usuario.nombre,
            defaults={'password': usuario.password}
        )

        refresh = RefreshToken.for_user(usuario_temp)

        # Si el login es correcto se genera el token
        refresh = RefreshToken.for_user(usuario)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
        })
    