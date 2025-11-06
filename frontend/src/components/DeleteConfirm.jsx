export default function DeleteConfirm({ producto, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          ¿Eliminar producto?
        </h2>
        <p className="text-gray-600 mb-6">
          Estás a punto de eliminar{" "}
          <span className="font-semibold">{producto.nombre}</span>.  
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
