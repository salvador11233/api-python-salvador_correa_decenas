import { useState } from "react";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(`Bienvenido ${form.email}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-poppins">
      <div className="bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">

        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-2">
          Bienvenido
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Inicia sesión para continuar
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Usuario
            </label>
            <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400 transition">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Tu usuario"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
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
        </form>

        {/* Enlaces */}
        <div className="text-center text-sm text-gray-400 mt-6">
          <a href="#" className="hover:text-yellow-400 transition">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}
