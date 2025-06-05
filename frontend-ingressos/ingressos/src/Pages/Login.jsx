import  {useState} from "react"
import {login} from '../services/api'
import {useNavigate} from 'react-router-dom'
import { Container, Form, Button } from "react-bootstrap";

function Login(){
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const {token, user} = await login(email, password)
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/admin")
        } catch(error) {
            console.log("Error no Handle Submit Register", error)
        }
    } 
        
    

return (
  <Container className="mt-5" style={{ maxWidth: "400px" }}>
    <h1 className="mb-4 text-center">Login</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Entrar
      </Button>
    </Form>
  </Container>
);
}

export default Login