import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import axios from "axios";
import React, {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import Token from "../../../components/token";
import Estacas from "../../users/adm/estacas";

const AdmEstacas = () => {
    const navigate = useNavigate();
    const [estacas, setEstacas] =useState<Estacas[]>([])


    
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/v1/estacas',
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }
            
        })
        .then((resposta: { data: any; }) => {
            setEstacas(resposta.data)
            console.log(resposta.data)
   })
       
    },[]);

    const excluir =(estacasExcluir:Estacas) => {
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/v1/estacas/${estacasExcluir.id}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }
            
        })
        .then((excluir: { data: any; }) => {
           if(excluir.data.msg){
              alert(excluir.data.msg)
              window.location.reload()
           }
            
        });
    }

    const editar = (editar:Estacas) => {
        if(editar.id){
          navigate(`/adm/estacas/${editar.id}`)
        }

    }
    
        
    return (
         <div>
         <Navbar />
         <div className="rolagem">

             <table className="table" >
                 <thead className="thead">
                     <tr>
                         <th scope="col">Nome da estacas</th>
                         <th scope="col">Endereço</th>
                         <th scope="col"> Editar</th>
                         <th scope="col">Excluir</th>
                     </tr>
                 </thead>
                 <tbody>
                     {estacas.map(resposta =>
                         <tr className="tr" key={resposta.id}>

                             <td > {resposta.nome}</td>
                             <td> {resposta.endereço} </td>
                             <td>
                                 <Button variant='outlined' onClick={() => editar(resposta)} >
                                     Editar
                                 </Button>
                             </td>
                             <td>
                                 <Button variant='outlined' color='error' onClick={() => excluir(resposta)} >
                                     Excluir
                                 </Button>
                             </td>
                         </tr>)}
                 </tbody>
             </table>
         </div>
     </div>
    );
 
}

export default  AdmEstacas;