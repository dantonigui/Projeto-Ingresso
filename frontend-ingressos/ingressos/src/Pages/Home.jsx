import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Header from '../components/Header'


function Home(){
    const [events, setEvents] = useState([])

    useEffect(()=>{
        //Sem precisar de Token para acessar essa rota!
        async function fetchEvents() {
            try {
                const response = await axios.get('http://localhost:5000/api/eventos/')
                setEvents(response.data)
            } catch (error){
                console.log("Erro eventos Home", error)
            }
        }
        fetchEvents()
    }, [events])

    async function handleBuy(event) {
        try{
            const res = await axios.post("http://localhost:5000/api/checkout/", {
                title: event.title,
                unit_price: event.price,
                quantity: 1,
                id: event._id
            })

            const {id} = res.data
            console.log(id)
            if (id){
                window.location.href = id;
            }
        } catch (error) {
            console.error("Erro no Handle buy", error)
        }
    }

return (<div>
  <Header></Header>
  <Container className="mt-4">
    <h2 className="mb-4 text-center">Eventos Disponíveis</h2>
    <Row xs={1} md={2} lg={3} className="g-4">
      {events.map((event) => (
        <Col key={event._id}>
          <Card>
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Card.Text>
                <strong>Data:</strong> {event.date.substring(8, 10) + '/' + event.date.substring(5, 7) + '/' + event.date.substring(0, 4)}
              </Card.Text>
              <Card.Text>
                <strong>Preço:</strong> R$ {parseFloat(event.price).toFixed(2)}
              </Card.Text>
              <Button variant="success" onClick={() => handleBuy(event)}>
                Comprar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</div>);

}

export default Home