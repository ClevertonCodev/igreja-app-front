import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.scss'
import Simbolo from '../../img/Simbolo2.png'
import useCookies from "react-cookie/cjs/useCookies";
import { useNavigate } from 'react-router-dom';




const Navbar = () => {
  var [cookie, setCookie, removeCookie] = useCookies(['name', 'token']);
  const navigate = useNavigate();
  const logout = () => {
      removeCookie('token')
      removeCookie('name')
      navigate("/")
  };

  console.log(cookie)
  var nome = cookie.name
  return (
    <nav id='navbar' className="navbar navbar-expand-lg static-top">
      <div className="container-sm">
      <a className="navbar-brand" href="#">
          <img className='simbolo' src={Simbolo} alt="foto de cristo" />
        </a>
        <a id='name' className="navbar-brand">Bem-vindo {nome}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

  
            <ul id='rotas'  className='navbar-nav ms-auto '>
              <li className="nav-item">
                <a id='botao' className="nav-link active" aria-current="page" href="/home">Inicio</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Estacas
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a id='botao' className="dropdown-item" href="/estacas">Cadastrar nova Estaca</a></li>
                  <li><a id='botao' className="dropdown-item" href="/adm/estacas">Administração</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Alas
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a id='botao' className="dropdown-item" href="/alas">Cadastrar nova Ala</a></li>
                  <li><a  id='botao' className="dropdown-item" href="/adm/alas">Administração</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a  className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Usuários
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a id='botao' className="dropdown-item" href="/user">Cadastrar novo usuário</a></li>
                  <li><a  id='botao' className="dropdown-item" href="/adm/user">Administração</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a id='botao' className="nav-link"  onClick={logout}>Sair </a>
              </li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
