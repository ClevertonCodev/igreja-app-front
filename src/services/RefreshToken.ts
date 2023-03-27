import axios from "axios";
import Refresh from "../components/token/Refresh";
import Token from "../components/token/Token";
import Cookies from 'js-cookie';
import logout from "./Logout";

export async function refreshToken(): Promise<string | void> {
    
    const token = await Refresh() 
    try {
      if(token){
        const response = await axios.post('http://127.0.0.1:8000/api/v1/refresh', {},
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        }
      );
  
      if(response.status === 200){
        Cookies.remove('refreshtoken');
        Cookies.remove('token');
    
        document.cookie = 'token=' + response.data.token;
        Token(response.data.token)
      }
       return response.data.token
       
      }else{
        Cookies.remove('refreshtoken');
        Cookies.remove('token');
        
        return window.location.href = '/login';
      }
    } catch (error:any) {
      if(error.response.status === 500){
        logout();
      }
      
    } 
    
}