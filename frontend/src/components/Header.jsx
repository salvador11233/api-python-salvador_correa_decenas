import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
        <a href="/" className="text-2xl font-bold">
          Examen Backend
        </a>
      </div>

      <ul className="flex space-x-4">
        <li>
          <Link
            to="/login"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Iniciar sesión
          </Link>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            🛒
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            🔍
          </a>
        </li>
      </ul>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-center py-6 space-y-4">
          <a href="/" className="block hover:text-yellow-400">Home</a>
          <a href="#" className="block hover:text-yellow-400">Products</a>
          <a href="#" className="block hover:text-yellow-400">Contact</a>
        </div>
      )}
    </header>
  );
}
