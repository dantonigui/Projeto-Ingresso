import '../styles/Footer.css'

function Footer(){
    return(<div className="Footer">
        <h1>Acompanhe nossas Redes Sociais</h1>

        <div className='Icons'>
            <i class="bi bi-facebook"></i>
            <i class="bi bi-instagram"></i>
            <i class="bi bi-whatsapp"></i>
        </div>
        <div className='Footer-Info'>
            <div className='Info'>
                <p>© Sua Empresa</p>
                <p>Seu Endereço/ CNPJ: Seu cnpj / Seu Contato</p>
            </div>
            <div>LOGO</div> 
        </div>
            
    </div>)
}

export default Footer