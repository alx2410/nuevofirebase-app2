import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./componentes/navbar"
import Post from "./paginas/post" // tu página de posts
import Usuario from "./paginas/Usuario"
import Productos from "./paginas/productos"
import Inicio from "./paginas/inicio"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/post" element={<Post />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
