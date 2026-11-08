import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { user, continueAsGuest } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Para onde voltar depois do login (a rota protegida vai informar isso)
  const backTo = location.state?.from ?? '/'

  // Quem já está logada não precisa ver o formulário
  if (user) return <Navigate to={backTo} replace />

  function handleGuest() {
    continueAsGuest()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="font-titulo text-xl tracking-wide uppercase">
          <span className="mr-2 text-dourado">✦</span>Locus Cine
        </Link>

        <div className="mt-12">
          <AuthForm onSuccess={() => navigate(backTo, { replace: true })} />
        </div>

        <div className="mt-8 border-t border-borda pt-6 text-center">
          <button
            type="button"
            onClick={handleGuest}
            className="text-sm text-suave underline hover:text-texto"
          >
            Continuar como visitante
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login