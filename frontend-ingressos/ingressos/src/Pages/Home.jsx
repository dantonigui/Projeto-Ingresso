import axios from "axios"
import { useEffect, useState } from "react"
// import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Header from '../components/Header'
import Footer from "../components/Footer";
import Event from '../components/Event'
import Welcome from "../components/Welcome";
import Program from "../components/Program";

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
    }, [])

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
        <Welcome></Welcome>
        <Event events={events} handleBuy={handleBuy}></Event>
        <Program events={events}></Program>
        <Footer></Footer>
</div>)

}

export default Home