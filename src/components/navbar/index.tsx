import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.scss'
import Simbolo from '../../img/Simbolo2.png'
import useCookies from "react-cookie/cjs/useCookies";
import { useNavigate } from 'react-router-dom';
import Token from '../token';
import { useState } from 'react';
import axios from 'axios';
import Parametros from '../../pages/users/adm/parametros';

const Navbar = () => {
  var [cookie, setCookie, removeCookie] = useCookies( ['token']);
  const navigate = useNavigate();
  const [paramentros, setParamentros] = useState('');
  const logout = () => {
      removeCookie('token')
      navigate("/")
  };
 
  if(!paramentros){
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/v1/me',
      headers: {
          'Accept': 'application/json',
          'Authorization': Token()
      }
    })
      .then((response: { data: any; }) => {
          setParamentros(response.data)
      })
      .catch(function (error) {
    
      });

  }

  var nome = paramentros['name' as any]
  
  return (
    <nav id='navbar' className="navbar navbar-expand-lg static-top">
      <div className="container-sm">
      <a className="navbar-brand" href="#">
          <img className='simbolo' src={Simbolo} alt="foto de cristo" />
        </a>
        <a id='name' className="navbar-brand" href="/me" >Bem-vindo {nome}</a>
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
