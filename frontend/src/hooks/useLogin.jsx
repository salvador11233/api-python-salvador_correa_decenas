import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (nombre, password) => {
    setLoading(true);
    setError(null);

    try {
      // Se consulta el login para Generar Token
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      // Guarda los tokens en localStorage
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("usuario_nombre", data.nombre);

      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error en login:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
