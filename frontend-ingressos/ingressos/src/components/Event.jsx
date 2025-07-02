import '../styles/Evento.css'

function Event(props){
    return(<div className='Div-Container-Evento'>
      <div className='Div-Evento-Title'>
        <h1>EVENTOS|INGRESSOS</h1>
      </div>
      <div className='Div-Container-Ingresso'>
          {props.events.map((event) => (
            <div className='Div-Ingresso-Evento'>
              <div className='Div-Ingresso-Image'>
                {event.image && (<img src={event.image} alt={event.title} style={{ width: "100%", maxWidth: "250px", borderRadius: "8px", marginTop: "20px"}}/>)}
              </div>
              <div className='Div-Container-Title'>
                <div className='Div-Title-Ingresso'>
                  <p id='TitleEvent'>{event.title}</p>
                  <p>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(event.price)}</p>
                  <span>2x de {new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(event.price / 2)}</span>
                </div>
                <div className="Div-Button-Ingresso">
                  <button id='Btn-Comprar' onClick={() => props.handleBuy(event)}><i class="bi bi-cart-fill"></i>COMPRAR</button>
                </div>
              </div> 
            </div>
          ))}
      </div>


    </div>)
}

export default Event