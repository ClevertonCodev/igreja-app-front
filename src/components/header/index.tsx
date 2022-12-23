// import './header.scss'
import Simbolo from '../../img/Simbolo2.png'
const Header = () => {

    return(
     <nav id='navbar' className="navbar 
     
     navbar-expand-lg">
        <img className='simbolo' src={Simbolo} alt="foto de cristo" />
       
     </nav>
     
    );

}

export default Header