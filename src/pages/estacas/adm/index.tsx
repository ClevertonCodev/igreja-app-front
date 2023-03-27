import { Button } from "@mui/material";
import React, {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader";
import Navbar from "../../../components/navbar";
import api from "../../../services/Instance";
import Estacas from "../../users/adm/estacas";

const AdmEstacas = () => {
    const navigate = useNavigate();
    const [estacas, setEstacas] =useState<Estacas[]>([])
    const [edelete, setDeleteE] = useState<string>()
    const [estaCarregando, setestaCarregando] = useState<boolean>(true);

    
    useEffect(()=>{
        setestaCarregando(true)
        api.get('/estacas').then((resposta: { data: any; }) => {
            setEstacas(resposta.data)
            setestaCarregando(false)
   })
       
    },[edelete]);

    const excluir =(estacasExcluir:Estacas) => {
        setestaCarregando(true)
        api.delete(`/estacas/${estacasExcluir}`)
        .then((excluir: { data: any; }) => {
           if(excluir.data.msg){
              setDeleteE(excluir.data.msg)
              alert(excluir.data.msg)
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
         {estaCarregando ? <Loader/> : 
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
        }
     </div>
    );
 
}

export default  AdmEstacas;