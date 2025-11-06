import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/productos");
        if (!response.ok) throw new Error("Error al obtener productos");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white text-center">
        <h2 className="text-xl text-gray-600">Cargando productos...</h2>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Productos Disponibles
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No hay productos disponibles.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p.id}
                className="shadow-lg rounded-2xl overflow-hidden text-center hover:scale-105 transition-transform duration-200"
              >
                <h3 className="bg-gray-800 text-white py-3 text-xl font-medium">
                  {p.nombre}
                </h3>

                <img
                  src="/images/carrito.jpg"
                  alt={p.nombre}
                  className="w-full h-64 object-contain p-4"
                />

                <div className="p-4">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                    Agregar al carrito
                  </button>

                  <div className="mt-3 text-gray-700">
                    <h4 className="font-semibold">Existencia: {p.stock || "0"}</h4>
                    <p>
                      <span className="text-green-600 font-bold">
                        ${parseFloat(p.precio).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
