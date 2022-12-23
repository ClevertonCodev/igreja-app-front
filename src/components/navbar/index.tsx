import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.scss'
import Simbolo from '../../img/Simbolo2.png'
import useCookies from "react-cookie/cjs/useCookies";

const Navbar = () => {
    const  [ cookie ]  =  useCookies ( [ 'name' ] ) ;
    var nome = cookie.name
    
    return (
        <nav id='navbar' className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <img className='simbolo' src={Simbolo} alt="foto de cristo" />
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" id='inicio' href="#">inicio</a>
                        <a className="nav-link" href="#">Features</a>
                        <a className="nav-link" href="#">Pricing</a>
                        <a className="nav-link ">Sair</a>
                    </div>
                </div>
                <a className="navbar-brand" href="#">Bem-vindo {nome}</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </div>
        </nav>
    );
}

export default Navbar;


