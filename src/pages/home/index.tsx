import axios from "axios";
import useCookies from "react-cookie/cjs/useCookies";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar';


const Home = () => {
    
    const navigate = useNavigate();
    const  [ cookies ,  setCookie ,  removeCookie ]  =  useCookies ( [ 'token' ] ) ;
    
     let token = cookies.token;

    




    const logout = () => {
       
      };

    axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/home',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token} `
        }
    })


        .then((response: { data: any; }) => {
                 var  resp = response.data
        })
        .catch(function (error) {
             try {
                 navigate("/login");
             }finally {

             }
        });
        
        
    return (
        <div>
            <Navbar/> 
            {/* <button onClick={logout}>Sair</button> */}
        </div>
    );
 
}

export default Home;