import { Link } from 'react-router-dom'

function Login() {
  return (
    <main className="p-10">
      <h1 className="font-titulo text-4xl text-turquesa">Login</h1>
      <p className="mt-2 text-suave">Aqui vai o formulário de login.</p>
      <Link to="/" className="mt-6 inline-block text-turquesa underline">
        Voltar para a Home
      </Link>
    </main>
  )
}

export default Login