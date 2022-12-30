import axios from "axios";
import Navbar from '../../components/navbar';
import Token from "../../components/token";


const Home = () => {

    

    axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/home',
        headers: {
            'Accept': 'application/json',
            'Authorization': Token()
        }
    })
        .then((response: { data: any; }) => {
                 var  resp = response.data
        })
        .catch(function (error) {

        });
        
        
    return (
        <div>
            <Navbar/> 
            {/* <button onClick={logout}>Sair</button> */}
        </div>
    );
 
}

export default Home;