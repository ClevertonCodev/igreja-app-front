import {useCookies } from "react-cookie";
function Authorization(){

    const  [ cookies ,  setCookie ,  removeCookie ]  =  useCookies ( [ 'token' ] ) ;
    let token = cookies.token;
    return token
}

export default Authorization;