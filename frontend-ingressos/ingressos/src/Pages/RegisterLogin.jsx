import { useState } from "react"
import { registerAdmin } from "../services/api"
import { useNavigate } from "react-router-dom"
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'

export default function Register() {
  const [form, setForm] = useState({
    business: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Generic handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {

      if (!form.business || !form.name || !form.email|| !form.password || !form.phone || !form.address) {
        alert("Preencha todos os campos!");
        return;
      }

      const { token, user } = await registerAdmin(
        form.business,
        form.name,
        form.email,
        form.password,
        form.phone,
        form.address
      )

      // Save token and user data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect to login or dashboard
      navigate("/login")
    } catch (err) {
      console.error("Registration error:", err)
      setError(err.response?.data?.message || "Erro ao registrar usuário.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4 text-center">Registre-se Admin</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="registerName">

            <Form.Label>Nome Comercial</Form.Label>
            <Form.Control
            name="business"
            type="text"
            value={form.business}
            onChange={handleChange}
            placeholder="Digite seu nome"
            required
          />

            
          <Form.Label>Nome</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Digite seu E-mail"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPhone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="registerAddress">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            placeholder="Digite seu endereço"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? <><Spinner animation="border" size="sm" /> Carregando...</> : 'Registrar-se'}
        </Button>
      </Form>
    </Container>
  )
}
