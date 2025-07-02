import '../styles/Program.css'

function Program(props){

        function formatDate(dataISO) {
        const data = new Date(dataISO);

        const dia = data.getDate().toString().padStart(2, '0');
        const mes = data.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase();

        return `${dia} ${mes} `;
        }

        function formatDay(dataISO) {
        const data = new Date(dataISO);

        const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase();

        return `${diaSemana}`;
        }


    return(<div className='Div-Container-Program'>
        <h1>Programação</h1>
        {props.events.map((event) => (
            <div className='Div-Program'>
                <div className='Div-Program-Title'>
                    <div className='Div-Date'>
                        <p>{formatDate(event.date)}<br></br>
                        {formatDay(event.date)}</p>
                    </div>
                    <div className='Div-Title'>
                        <h1>{event.title}</h1>
                    </div>
                </div>
                <button id='Btn-Program-Buy'>COMPRAR</button>
            </div>
        ))}
    </div>)
}

export default Program