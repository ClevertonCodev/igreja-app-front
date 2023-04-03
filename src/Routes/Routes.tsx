import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Users from "../pages/users";
import Home from "../pages/home";
import Login from "../pages/login";
import PrivateRoute from "./roustesprivates/private";
import EstacaS from "../pages/estacas";
import AdmEstacas from "../pages/estacas/adm";
import Alas from "../pages/alas";
import AdmAlas from "../pages/alas/adm/index";
import AdmUser from "../pages/users/adm";
import Caravanas from "../pages/caravanas";
import AdmCaravanas from "../pages/caravanas/adm";
import Veiculos from "../pages/veiculos";
import TiPoveiculos from "../pages/tipoveiculos";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<Users />} />
          <Route path="/adm/user" element={<AdmUser />} />
          <Route path="/adm/user/:id" element={<Users />} />
          <Route path="/me" element={<Users />} />
          <Route path="/estacas" element={<EstacaS />} />
          <Route path="/adm/estacas" element={<AdmEstacas />} />
          <Route path="/adm/estacas/:id" element={<EstacaS />} />
          <Route path="/alas" element={<Alas />} />
          <Route path="/adm/alas" element={<AdmAlas />} />
          <Route path="/adm/alas/:id" element={<Alas />} />
          <Route path="/caravanas" element={<Caravanas />} />
          <Route path="/adm/caravanas" element={<AdmCaravanas />} />
          <Route path="/adm/caravanas/:id" element={<Caravanas />} />
          <Route path='/veiculos' element={<Veiculos/>}/>
          <Route path='/tiposveiculos' element={<TiPoveiculos/>}/>
        </Route>
        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
}
