import { useState, useEffect, useRef } from 'react'

import { db } from './lib/firebase'
import { collection, onSnapshot, query, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

function Post() {
  const [posts, setPosts] = useState([])
  const [texto, setTexto] = useState("")
  const [editId, setEditId] = useState(null)
  const inputRef = useRef(null)

  // Escuchar posts en tiempo real
  useEffect(() => {
    const q = query(collection(db, "post"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPosts(docs)
    })
    return () => unsubscribe()
  }, [])

  // Guardar o editar post
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!texto.trim()) return

    const mensaje = texto
    setTexto("") // limpiar input inmediatamente
    inputRef.current.focus()

    if (editId) {
      const postRef = doc(db, "post", editId)
      await updateDoc(postRef, { mensaje })
      setEditId(null)
    } else {
      await addDoc(collection(db, "post"), {
        mensaje,
        createdAt: new Date()
      })
    }
  }

  // Activar modo edición
  const editarPost = (post) => {
    setTexto(post.mensaje)
    setEditId(post.id)
    inputRef.current.focus()
  }

  // Borrar post
  const borrarPost = async (id) => {
    const postRef = doc(db, "post", id)
    await deleteDoc(postRef)
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-purple-300">Posts</h1>

      <form onSubmit={handleSubmit} className="flex mb-6 w-full max-w-md">
        <input
          ref={inputRef}
          className="flex-1 border border-purple-100 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
          type="text"
          placeholder="Escribe tu mensaje"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-300 text-black px-4 py-2 rounded-r hover:bg-purple-400 transition"
        >
          {editId ? "Editar" : "Guardar"}
        </button>
      </form>

      <ul className="w-full max-w-md space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="bg-purple-100 p-4 rounded flex justify-between items-center">
            <span className="text-purple-800">{post.mensaje}</span>
            <div className="flex space-x-2">
              <button onClick={() => editarPost(post)} className="hover:text-blue-600">✏️</button>
              <button onClick={() => borrarPost(post.id)} className="hover:text-red-600">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Post
