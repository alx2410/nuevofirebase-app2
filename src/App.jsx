import { useState, useEffect } from 'react'
import './App.css'
import { db } from './lib/firebase'
import { collection, onSnapshot, query, addDoc } from 'firebase/firestore'

function App() {
  //Variable para guardar los post
  const [post, setPost] = useState([])
  const [texto, setTexto] =useState("")

  useEffect(() => {
    // Creamos una consulta
    const consulta = query(collection(db, "post"));

    // Escuchamos los cambios en tiempo real
    const unsubscribe = onSnapshot(consulta, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //Actualizar post
      setPost(docs)
    })

    //Limpar unsubscribe
      return () => unsubscribe()
    }, [])

    //Agregar Post
    // 👉 Función para agregar un mensaje
  const agregarPost = async () => {
    //if (!texto.trim()) return alert("no hay mensaje que enviar") // evitar vacíos
    await addDoc(collection(db, "post"), {
      mensaje: texto,
      createdAt: new Date(), // fecha actual
    })

    setTexto("") // limpiar input
  }
  
    return (
    <>
      <div>Post</div>
      {/* 🆕 Input para escribir mensaje */}
      {/* onKeyDown={(e) => e.key === "Enter" && agregarPost()} */}
      <input
        className='border p-2 me-2'
        type="text"
        placeholder="Escribe tu mensaje"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button
        className='bg-blue-5000 text-white px-3 py-2 rounded'
        onClick={agregarPost}
      >
        Guardar
      </button>


      <ul>
        {
          post.map((doc) => (
            <li key={doc.id}>{doc.mensaje} - {doc.autor} - {doc.Autor}</li>
          ))
        }
      </ul>


    </>
  )
}

export default App
