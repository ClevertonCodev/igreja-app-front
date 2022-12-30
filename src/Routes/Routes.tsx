import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Users from "../pages/users";
import Home from "../pages/home";
import Login from "../pages/login";
import PrivateRoute from "./roustesprivates/private";
import Authorization from "../components/token/auth";
import EstacaS from "../pages/estacas";
import AdmEstacas from "../pages/estacas/adm";
import Alas from "../pages/alas";
import AdmAlas from '../pages/alas/adm/index';
import AdmUser from "../pages/users/adm";


export default function AppRouter(){
    var isLogged = false
   if(Authorization()){
    isLogged = true
   }
    return(
        <Router>
            <Routes>   
                <Route path='/login' element={<Login/>}/>
                <Route element={<PrivateRoute isLogged={isLogged} />}>
                     <Route path='/home' element={<Home/>}/>
                     <Route path="/user" element={<Users/>} />
                     <Route path="/adm/user" element={<AdmUser/>} />
                     <Route path="/adm/user/:id"element={<Users/>} />
                     <Route path='/estacas' element={<EstacaS/>}/>
                     <Route path='/adm/estacas' element={<AdmEstacas/>}/>
                     <Route path='/adm/estacas/:id' element={<EstacaS/>}/>
                     <Route path='/alas' element={<Alas/>}/>
                     <Route path='/adm/alas' element={<AdmAlas/>}/>
                     <Route path='/adm/alas/:id' element={<Alas/>}/>
                </Route>
                <Route path='/*' element={<Login/>}/>
            </Routes>
        </Router>
    );
}