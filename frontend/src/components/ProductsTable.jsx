import { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import ProductModal from "../components/ProductModal";
import DeleteConfirm from "../components/DeleteConfirm";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function ProductsTable() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDelete, setShowDelete] = useState(false); 

  const [colDefs] = useState([
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "precio", headerName: "Precio", width: 140 },
    { field: "stock", headerName: "Stock", width: 120 },
    {
      field: "activo",
      headerName: "Activo",
      width: 120,
      cellRenderer: (params) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            params.value ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {params.value ? "Sí" : "No"}
        </span>
      ),
    },
    {
      headerName: "Acciones",
      width: 160,
      cellRenderer: (params) => (
        <div className="flex justify-center gap-2">
          {/* boton de editar producto */}
          <button
            className="text-blue-500 hover:text-blue-400"
            onClick={() => handleEdit(params.data)}
          >
            <Edit size={18} />
          </button>
          {/* boton para eliminar producto*/}
          <button
            className="text-red-500 hover:text-red-400"
            onClick={() => handleDeleteConfirm(params.data)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ]);


    const fetchProductos = async () => {
        try {
            const response = await fetch(`${API_URL}/api/productos`);
            if (!response.ok) throw new Error("Error al obtener productos");
            const data = await response.json();
            setRowData(data);
        } catch (error) {
            console.error("Error cargando productos:", error);
        } finally {
            setLoading(false);
        }
    };


  useEffect(() => {
    fetchProductos();
  }, []);

  // se guarda el producto nuevo
  const handleSave = async (producto) => {
    try {
      const token = localStorage.getItem("access_token");
      const url = selectedProduct
        ? `${API_URL}/api/productos/${selectedProduct.id}`
        : `${API_URL}/api/productos`;

      const method = selectedProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) throw new Error("Error al guardar el producto");

      setShowModal(false);
      setSelectedProduct(null);
      fetchProductos(); // se refresca la tabla
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar producto");
    }
  };

  // edición
  const handleEdit = (producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  const handleDeleteConfirm = (producto) => {
    setSelectedProduct(producto);
    setShowDelete(true);
  };

    const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_URL}/api/productos/${selectedProduct.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar el producto");

      setShowDelete(false);
      setSelectedProduct(null);
      fetchProductos(); // recargar
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Error al eliminar producto");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Listado de Productos
          </h1>
          <button
            onClick={() => {
              setSelectedProduct(null); // si es modo nuevo
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            <PlusCircle size={18} />
            Crear producto
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Cargando productos...</p>
        ) : (
          <div style={{ height: 400, width: "100%" }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              animateRows
              domLayout="autoHeight"
              theme={themeQuartz}
            />
          </div>
        )}
      </div>

      {/* Modal de creación o edición */}
      {showModal && (
        <ProductModal
          producto={selectedProduct}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          onSave={handleSave}
        />
      )}
      {/* Modal para eliminar*/}
      {showDelete && selectedProduct && (
        <DeleteConfirm
          producto={selectedProduct}
          onCancel={() => {
            setShowDelete(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}