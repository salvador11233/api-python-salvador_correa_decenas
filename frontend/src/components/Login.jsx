import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [form, setForm] = useState({ nombre: "", password: "" });
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form.nombre, form.password);
      alert(`Bienvenido ${data.nombre}`);
      // Puedes redirigir con window.location.href o react-router-dom
      // window.location.href = "/dashboard";
    } catch (err) {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-poppins">
      <div className="bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">

        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-2">
          Bienvenido
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Inicia sesión para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Usuario
            </label>
            <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={form.nombre}
                onChange={(e) =>
                  setForm({ ...form, nombre: e.target.value })
                }
                className="bg-transparent w-full outline-none text-gray-100 placeholder-gray-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Contraseña
            </label>
            <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="bg-transparent w-full outline-none text-gray-100 placeholder-gray-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition disabled:opacity-70"
          >
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>

          {error && (
            <p className="text-red-400 text-center mt-3">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
