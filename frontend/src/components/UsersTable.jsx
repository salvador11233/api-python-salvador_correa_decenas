import { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import UserModal from "../components/UserModal";
import DeleteConfirm from "../components/DeleteConfirm";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function UsersTable() {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const [colDefs] = useState([
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "apellido", headerName: "Apellido", flex: 1 },
    { field: "edad", headerName: "Edad", width: 120 },
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
          {/* Editar */}
          <button
            className="text-blue-500 hover:text-blue-400"
            onClick={() => handleEdit(params.data)}
          >
            <Edit size={18} />
          </button>

          {/* Eliminar */}
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

  // Cargar usuarios
const fetchUsuarios = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch("http://localhost:8000/api/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error al obtener usuarios");
    const data = await response.json();
    setRowData(data);
  } catch (error) {
    console.error("Error cargando usuarios:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Guardar
  const handleSave = async (usuario) => {
    try {
        console.log("Datos enviados al backend:", usuario);
      const token = localStorage.getItem("access_token");
      const url = selectedUser
        ? `http://localhost:8000/api/usuarios/${selectedUser.id}`
        : "http://localhost:8000/api/usuarios";
      const method = selectedUser ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) throw new Error("Error al guardar el usuario");

      setShowModal(false);
      setSelectedUser(null);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert("Error al guardar usuario");
    }
  };

  // para editar
  const handleEdit = (usuario) => {
    setSelectedUser(usuario);
    setShowModal(true);
  };

  // para confirmar eliminación
  const handleDeleteConfirm = (usuario) => {
    setSelectedUser(usuario);
    setShowDelete(true);
  };

  // Eliminar 
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/api/usuarios/${selectedUser.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar usuario");

      setShowDelete(false);
      setSelectedUser(null);
      fetchUsuarios();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("Error al eliminar usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Listado de Usuarios
          </h1>
          <button
            onClick={() => {
              setSelectedUser(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            <PlusCircle size={18} />
            Crear usuario
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Cargando usuarios...</p>
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

      {/* Modal crear/editar */}
      {showModal && (
        <UserModal
          usuario={selectedUser}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Modal eliminar */}
      {showDelete && selectedUser && (
        <DeleteConfirm
          producto={selectedUser}
          onCancel={() => {
            setShowDelete(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
