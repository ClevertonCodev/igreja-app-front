import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Users from "../pages/users";
import Home from "../pages/home";
import Login from "../pages/login";
import PrivateRoute from "./roustesprivates/private";
import Authorization from "../components/token/auth";
import Adm from "../pages/users/adm";
import Token from "../components/token";

export default function AppRouter(){
    var isLogged = false
   if(Authorization()){
    isLogged = true
   }
    return(
        <Router>
            <Routes>   
                <Route path='/login' element={<Login/>}/>
                <Route path='/adm' element={<Adm/>}/>
                <Route element={<PrivateRoute isLogged={isLogged} />}>
                <Route path='/home' element={<Home/>}/>
                <Route path="/user" element={<Users/>} />
                <Route path="/adm" element={<Adm/>} />
                <Route path="/adm/:id"element={<Users/>} />
                </Route>
                <Route path='/*' element={<Login/>}/>
            </Routes>
        </Router>
    );
}