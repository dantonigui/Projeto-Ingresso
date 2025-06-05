import { useState } from "react"
import { register } from "../services/api"
import { useNavigate } from "react-router-dom"
import { Container, Form, Button } from 'react-bootstrap';


function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()



    async function handleSubmit(e) {
        e.preventDefault()
        try{
            const{token, user} = await register(name, email, password)
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/login")
        }catch(error){
            console.log("Error no Handle Submit Register", error)
        }
    }
    
return (
  <Container className="mt-5" style={{ maxWidth: "500px" }}>
    <h1 className="mb-4 text-center">Registre-se</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Registrar-se
      </Button>
    </Form>
  </Container>
);

}

export default Register