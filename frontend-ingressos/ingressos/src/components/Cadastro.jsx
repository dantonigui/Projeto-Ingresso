import '../styles/register.css'
import { useState } from "react"
import { login, register } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Cadastro() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { token, user } = await login(loginEmail, loginPassword)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      navigate("/")
    } catch (error) {
      console.error("Erro no login:", error)
      alert("Erro ao fazer login. Verifique seu email e senha.")
    }
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const { email, password, confirmPassword } = registerForm

    if (!email || !password || !confirmPassword) {
      alert("Preencha todos os campos!")
      return
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }

    try {
      const { token, user } = await register(
        "", // nome vazio
        email,
        password,
        "", // telefone vazio
        ""  // endereço vazio
      )

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      navigate("/")
    } catch (error) {
      console.error("Erro no registro:", error)
      alert("Erro ao criar conta. Tente novamente.")
    }
  }

  return (
    <div className='container-cadastro'>
      <div className='title-cadastro'>
        <p>Home / Minha Conta / Identificação </p>
      </div>

      <div className='container-form'>
        <div className='container-login'>
          <div className='form-login'>
            <form onSubmit={handleLogin}>
              <h3>Já sou cliente</h3>
              <p>Endereço de E-mail</p>
              <input
                type="email"
                placeholder='Endereço de E-mail'
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <p>Senha</p>
              <input
                type="password"
                placeholder='Senha'
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <br />
              <button type="submit">ACESSAR CONTA</button>
            </form>
          </div>
        </div>

        <div className='container-register'>
          <div className='form-register'>
            <form onSubmit={handleRegister}>
              <h3>Quero me Cadastrar</h3>
              <p>Endereço de E-mail</p>
              <input
                type="email"
                name="email"
                placeholder='Endereço de E-mail'
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
              />
              <p>Senha</p>
              <input
                type="password"
                name="password"
                placeholder='Senha'
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
              />
              <p>Confirmar sua Senha</p>
              <input
                type="password"
                name="confirmPassword"
                placeholder='Confirmar sua Senha'
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
              <br />
              {/* <input type='radio'></input>Concordo com os termos de uso.<br></br> */}
              <button type="submit">CRIAR CONTA</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastro
