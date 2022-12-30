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
            <Navbar/> 
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>

                            <TableCell>
                                Nome da estacas
                            </TableCell>

                            <TableCell>
                                Endereço
                            </TableCell>

                            <TableCell>
                                Editar
                            </TableCell>

                            <TableCell>
                                Excluir
                            </TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {estacas.map(resposta => 
                        <TableRow key={resposta.id}>
                            <TableCell>
                                {resposta.nome}
                            </TableCell> 

                            <TableCell>
                               {resposta.endereço}  
                            </TableCell>
                            <TableCell>
                            <Button variant='outlined'  onClick={() => editar(resposta)} >
                                    Editar
                            </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color='error' onClick={() => excluir(resposta)} >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
 
}

export default  AdmEstacas;