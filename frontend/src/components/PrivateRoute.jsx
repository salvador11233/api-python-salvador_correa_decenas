import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");

  // ii no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // si hay token, ´permite entrar
  return children;
}
