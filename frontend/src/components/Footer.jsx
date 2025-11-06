export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="container mx-auto px-6 grid md:grid-cols-1 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4 text-white">Sobre el examen</h4>
          <p className="text-sm">
            Construir un API REST simple que permita la administración de usuarios y productos (CRUD), con autenticación para consumir los endpoints (JWT, OAuth2.0, etc). Elaborar con las mejores prácticas utilizando POO, legibilidad y seguridad.
            <br/>
            <br/>
            Se crea una tienda basica con la alta de los productos y el admin de los usuarios.
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © 2025 All Rights Reserved.
      </div>
    </footer>
  );
}
