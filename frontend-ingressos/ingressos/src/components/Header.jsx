import '../styles/Header.css';

function Header() {
  return (
    <div className='Header'> 
      <ul className='nav-bar'>
        <li>LOGO</li>
        <li>Home</li>
        <li>Empresa</li>
        <li>Programação</li>

        {/* Dropdown Minha Conta */}
        <li className="dropdown">
          Minha Conta<i class="bi bi-arrow-down-short"></i>
          <ul className="dropdown-content">
            <li>MEUS INGRESSOS</li>
            <li>CARRINHO</li>
            <li>ENTRAR/CADASTRAR</li>
          </ul>
        </li>

        {/* Dropdown Dúvidas */}
        <li className="dropdown">
          Dúvidas<i class="bi bi-arrow-down-short"></i>
          <ul className="dropdown-content">
            <li>REGRAS </li>
            <li>COMEMORE CONOSCO</li>
            <li>COMO COMPRAR</li>
            <li>FORMAS DE PAGAMENTO</li>
            <li>CADÊ MEU INGRESSO?</li>
          </ul>
        </li>

        <li id='Btn-Ingressos'>Ingressos</li>
      </ul>
    </div>
  );
}

export default Header;
