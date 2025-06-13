import  {useState} from "react"
import {loginAdmin} from '../services/api'
import {useNavigate} from 'react-router-dom'
import { Container, Form, Button } from "react-bootstrap";

function AdminLogin(){
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const {token, user} = await loginAdmin(email, password)
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/adminpanel")
        } catch(error) {
            console.log("Error no Handle Submit Login", error)
            alert("Email ou Senha Incorretas")
        }
    } 
        
    

return (
  <Container className="mt-5" style={{ maxWidth: "400px" }}>
    <h1 className="mb-4 text-center">Login Admin</h1>
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

export default AdminLogin