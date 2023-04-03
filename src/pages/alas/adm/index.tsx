import { Button } from "@mui/material";
import axios from "axios";
import React, {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader";
import Navbar from "../../../components/navbar";
import Token from "../../../components/token/Token";
import Alas from "../../users/adm/alas";
import Layout from "../../../components/layout";

const AdmAlas = () => {
    const navigate = useNavigate();
    const [alas, setAlas] =useState<Alas[]>([])
    const[wards, setWards] = useState()
    const [estaCarregando, setestaCarregando] = useState<boolean>(true);


    
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/v1/alas',
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }
            
        })
        .then((resposta: { data: any; }) => {
            setAlas(resposta.data)
            setestaCarregando(false)
    
   })
       
    },[wards]);

    const excluir =(alasExcluir:Alas) => {
        setestaCarregando(true)
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/v1/alas/${alasExcluir.id}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }
            
        })
        .then((excluir: { data: any; }) => {
           if(excluir.data.msg){
            setWards(excluir.data.msg)
            alert(excluir.data.msg)
             
           }
            
        });
    }
    const editar = (editar:Alas) => {
        if(editar.id){
          navigate(`/adm/alas/${editar.id}`)
        }

    }
    return (
        <Layout title="Alas">
        <div>
         { estaCarregando? <Loader/> : 
         <div className="rolagem">

             <table className="table" >
                 <thead className="thead">
                     <tr>
                         <th scope="col">Nome da Alas</th>
                         <th scope="col">Endereço</th>
                         <th scope="col"> Estaca</th>
                         <th scope="col"> Editar</th>
                         <th scope="col">Excluir</th>
                     </tr>
                 </thead>
                 <tbody>
                     {alas.map(resposta =>
                         <tr className="tr" key={resposta.id}>

                             <td > {resposta.name}</td>
                             <td> {resposta.endereço} </td>
                             <td>
                                 {resposta.estacas ? resposta.estacas["nome"]: ''}
                            </td>
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
         }
     </div>
     </Layout>
    );
}

export default AdmAlas;