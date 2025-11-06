import { useState, useEffect } from "react";

export default function ProductModal({ onClose, onSave, producto }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    activo: true,
  });

  // Si se recibe un producto, cargamos sus datos
  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
        activo: producto.activo,
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {producto ? "Editar producto" : "Crear nuevo producto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Precio</label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
              className="w-4 h-4 text-yellow-400"
            />
            <label className="text-sm font-semibold text-gray-600">Activo</label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
