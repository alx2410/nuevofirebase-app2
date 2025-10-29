import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-purple-100 shadow-md p-4 flex justify-between items-center font-sans">
      <h1 className="text-2xl font-bold text-purple-600">Mi App</h1>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/"
            className="text-purple-700 hover:text-purple-900 transition-colors"
          >
            🏠 Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/usuarios"
            className="text-purple-700 hover:text-purple-900 transition-colors"
          >
            👥 Usuarios
          </Link>
        </li>
        <li>
          <Link
            to="/post"
            className="text-purple-700 hover:text-purple-900 transition-colors"
          >
            📝 Post
          </Link>
        </li>
        <li>
          <Link
            to="/productos"
            className="text-purple-700 hover:text-purple-900 transition-colors"
          >
            📦 Productos
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
