import React from "react";
import { Cookies, useCookies } from "react-cookie";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Users from "../pages/users/users";
import Home from "../pages/home";
import Login from "../pages/login";


import PrivateRoute from "./roustesprivates/private";



export default function AppRouter(){
    var isLogged = false; 

    const  [ cookies ,  setCookie ,  removeCookie ]  =  useCookies ( [ 'token' ] ) ;
    let token = cookies.token;
   if(token){
        isLogged = true
   }
       

    
         
   
    return(
        <Router>
            <Routes>   
                <Route path='/login' element={<Login/>}/>
               
                <Route element={<PrivateRoute isLogged={isLogged} />}>
                <Route path='/home' element={<Home/>}/>
                <Route path="/user" element={<Users/>} />
                </Route>
                <Route path='/*' element={<Login/>}/>
            </Routes>
        </Router>
    );
}