import { createContext, useContext, useRef, useState } from 'react'

// Login SIMULADO: tudo fica guardado no navegador, sem servidor.
// Em um sistema real, a senha nunca seria guardada assim.
const AuthContext = createContext(null)

const USERS_KEY = 'locus_users' // lista de contas criadas (localStorage)
const SESSION_KEY = 'locus_session' // quem está logada (localStorage)
const GUEST_KEY = 'locus_guest' // modo visitante (sessionStorage)

// Lê um valor do navegador sem quebrar se estiver vazio ou corrompido
function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJSON(SESSION_KEY, null))
  const [isGuest, setIsGuest] = useState(() => sessionStorage.getItem(GUEST_KEY) === 'true')
  const [loginOpen, setLoginOpen] = useState(false) // o pop-up está aberto?

  // Guarda a ação que estava esperando o login (ex.: ir para a compra)
  const pendingAction = useRef(null)

  function startSession(email) {
    const session = { email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    sessionStorage.removeItem(GUEST_KEY)
    setUser(session)
    setIsGuest(false)
    setLoginOpen(false)

    // Se havia uma ação esperando, executa agora
    const action = pendingAction.current
    pendingAction.current = null
    if (action) action()
  }

  function register(email, password) {
    const users = readJSON(USERS_KEY, [])
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: 'Este e-mail já tem cadastro. Tente entrar.' }
    }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, { email, password }]))
    startSession(email)
    return { ok: true }
  }

  function login(email, password) {
    const users = readJSON(USERS_KEY, [])
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return { ok: false, error: 'E-mail ou senha incorretos.' }
    startSession(email)
    return { ok: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  function continueAsGuest() {
    sessionStorage.setItem(GUEST_KEY, 'true')
    setIsGuest(true)
  }

  // Se está logada, executa a ação na hora. Se não, abre o pop-up
  // e executa a ação só depois que o login der certo.
  function requireLogin(action) {
    if (user) {
      action()
      return
    }
    pendingAction.current = action
    setLoginOpen(true)
  }

  function closeLogin() {
    pendingAction.current = null
    setLoginOpen(false)
  }

  const value = {
    user,
    isGuest,
    loginOpen,
    register,
    login,
    logout,
    continueAsGuest,
    requireLogin,
    closeLogin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}