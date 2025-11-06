from django.urls import path
from .views import(UsuarioLista, UsuarioDetalle, ProductoLista, ProductoDetalle, LoginUsuariosView)

urlpatterns = [
    # URLs de Usuarios sin ID
    path('usuarios', UsuarioLista.as_view(), name='usuario_lista'),
    # URLs de Usuario con ID
    path('usuarios/<int:pk>', UsuarioDetalle.as_view(), name='usuario_detalle'),

    # URLs de Productos sin ID
    path('productos', ProductoLista.as_view(), name='producto_lista'),
    # URLs de Producto con ID
    path('prodcutos', ProductoDetalle.as_view(), name='producto_detalle'),

    # Login de usuarios
    path("login/", LoginUsuariosView.as_view(), name="login_usuarios"),

]