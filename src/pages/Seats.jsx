import { Link, useParams } from 'react-router-dom'

// Página PROVISÓRIA, só para testar a rota protegida.
// A grade de assentos de verdade entra na branch feat/assentos.
function Seats() {
  const { movieId, time } = useParams() // lê o filme e o horário do endereço

  return (
    <main className="p-10">
      <h1 className="font-titulo text-4xl text-turquesa">Compra</h1>
      <p className="mt-2 text-suave">
        Filme {movieId}, sessão das {time}. Aqui vai a escolha de assentos.
      </p>
      <Link to="/" className="mt-6 inline-block text-turquesa underline">
        Voltar para a Home
      </Link>
    </main>
  )
}

export default Seats