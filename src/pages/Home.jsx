import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="p-10">
      <h1 className="font-titulo text-4xl text-turquesa">Home</h1>
      <p className="mt-2 text-suave">Aqui vai o catálogo de filmes.</p>
      <Link to="/login" className="mt-6 inline-block text-turquesa underline">
        Ir para o login
      </Link>
    </main>
  )
}

export default Home