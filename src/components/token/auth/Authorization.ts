import {useCookies } from "react-cookie";
function Authorization(){
    try {
        const  [ cookies ,  setCookie ,  removeCookie ]  =  useCookies ( [ 'token' ] ) ;
        let token = cookies.token;
    
        return token 
    } catch (error) {
        return ''
    }
    
}

export default Authorization;