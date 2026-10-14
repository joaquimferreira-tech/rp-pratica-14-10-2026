import { useEffect, useState } from 'react'
import FrutaComponent from './components/frutaComponent'
import './App.css'

function App() {
  const [frutas, setFrutas] = useState(null)

  async function getFrutas() {
    try {
      const res = await fetch("http://localhost:3000/frutas")
      if (!res.ok) {
        throw new Error(`Erro no servidor: ${res.status}`)
      }
      const data = await res.json()
      setFrutas(data)
    } catch (error) {
      console.error("Failed to fetch frutas:", error)
      setFrutas([])
    }
  }

  useEffect(() => {
    getFrutas()
  }, [])

  return (
    <div>
      {
        frutas === null ? (
          <div>...carregando</div>
        ) : (
          frutas.map((fruta) => (
            <FrutaComponent key={fruta.id || fruta.nome} data={fruta} />
          ))
        )
      }
    </div>
  )
}

export default App