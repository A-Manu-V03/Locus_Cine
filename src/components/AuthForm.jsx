import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

// Formulário de entrar e criar conta.
// Prop: onSuccess (opcional) é uma função chamada quando o login ou cadastro dá certo.
function AuthForm({ onSuccess }) {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login') // 'login' ou 'cadastro'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isLogin = mode === 'login'

  function handleSubmit(event) {
    event.preventDefault() // impede a página de recarregar ao enviar

    const result = isLogin ? login(email, password) : register(email, password)

    if (!result.ok) {
      setError(result.error)
      return
    }
    if (onSuccess) onSuccess()
  }

  function toggleMode() {
    setMode(isLogin ? 'cadastro' : 'login')
    setError('')
  }

  const inputClass =
    'mt-2 w-full rounded-lg border border-borda bg-painel px-4 py-3.5 text-sm placeholder:text-suave focus:border-turquesa focus:outline-none'

  return (
    <div>
      <h2 className="font-titulo text-3xl uppercase">
        {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
      </h2>
      <p className="mt-3 text-sm text-suave">
        {isLogin
          ? 'Entre para escolher seus assentos e comprar seu ingresso.'
          : 'Leva um minuto e você já pode comprar seu ingresso.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block text-sm">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seuemail@exemplo.com"
            className={inputClass}
          />
        </label>

        <label className="block text-sm">
          Senha
          <input
            type="password"
            required
            minLength={4}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Sua senha"
            className={inputClass}
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-turquesa py-3.5 text-sm font-semibold text-fundo"
        >
          {isLogin ? 'Entrar' : 'Criar conta'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-suave">
        {isLogin ? 'Ainda não tem conta? ' : 'Já tem conta? '}
        <button type="button" onClick={toggleMode} className="text-turquesa underline">
          {isLogin ? 'Criar uma conta' : 'Entrar'}
        </button>
      </p>
    </div>
  )
}

export default AuthForm