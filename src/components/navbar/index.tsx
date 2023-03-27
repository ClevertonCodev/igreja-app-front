import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.scss";
import Simbolo from "../../img/Simbolo2.png";
import useCookies from "react-cookie/cjs/useCookies";
import {Link} from "react-router-dom";
import UserData from "../../services/UserData";
import logout from "../../services/Logout";

const Navbar = () => {
  var [cookie, setCookie, removeCookie] = useCookies(["token",  "refreshtoken"]);
  var validate: boolean = false;
  const nome = UserData()?.name;
  const type = UserData()?.type;
 
  if (type === "secretarios") {
    validate = true;
  }

  return (
    <nav id="navbar" className="navbar navbar-expand-lg static-top">
      <div className="container-sm">
        <Link className="navbar-brand" to={"/home"}>
          <img className="simbolo" src={Simbolo} alt="foto de cristo" />
        </Link>

        <Link id="name" className="navbar-brand" to="/me">
          Bem-vindo {nome}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul id="rotas" className="navbar-nav ms-auto ">
            <li className="nav-item">
              <Link id="botao" className="nav-link active" to="/home">
                Inicio
              </Link>
            </li>
            {validate && (
              <li id="botao" className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Caravanas
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link id="botao" className="dropdown-item" to="/caravanas">
                      Cadastrar nova caravana
                    </Link>
                  </li>
                  <li>
                    <Link
                      id="botao"
                      className="dropdown-item"
                      to="/adm/caravanas"
                    >
                      Administração
                    </Link>
                  </li>
                  <li>
                    <Link id="botao" className="dropdown-item" to="/veiculos">
                      Cadastrar novo veiculo
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            <li id="botao" className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="#"
              >
                Estacas
              </Link>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link id="botao" className="dropdown-item" to="/estacas">
                    Cadastrar nova estaca
                  </Link>
                </li>
                <li>
                  <Link id="botao" className="dropdown-item" to="/adm/estacas">
                    Administração
                  </Link>
                </li>
              </ul>
            </li>
            <li id="botao" className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="#"
              >
                Alas
              </Link>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link id="botao" className="dropdown-item" to="/alas">
                    Cadastrar nova ala
                  </Link>
                </li>
                <li>
                  <Link id="botao" className="dropdown-item" to="/adm/alas">
                    Administração
                  </Link>
                </li>
              </ul>
            </li>
            <li id="botao" className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Usuários
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link id="botao" className="dropdown-item" to="/user">
                    Cadastrar novo usuário
                  </Link>
                </li>
                <li>
                  <Link to="/adm/user" id="botao" className="dropdown-item">
                    Administração
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className="nav-i
              tem"
            >
              <a id="botao" className="nav-link" onClick={() => logout()}>
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
