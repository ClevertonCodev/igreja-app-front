import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import axios from "axios";
import React, {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import Users from './users';
import Token from "../../../components/token";

const Adm = () => {
    const navigate = useNavigate();
    const [users, setUsers] =useState<Users[]>([])

    
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/v1/users',
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }
            
        })
        .then((resposta: { data: any; }) => {
            setUsers(resposta.data)
   })
       
    },[]);

    const excluir =(userExcluir:Users) => {
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/v1/users/${userExcluir.id}`,
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

    const editar = (editar:Users) => {
        if(editar.id){
          navigate(`/adm/${editar.id}`)
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
                                Nome
                            </TableCell>
                            <TableCell>
                                email
                            </TableCell>
                            <TableCell>
                                Ativo
                            </TableCell>
                            <TableCell>
                                Tipo
                            </TableCell>
                            <TableCell>
                                Rg
                            </TableCell>
                            <TableCell>
                                cpf
                            </TableCell>
                            <TableCell>
                                Telefone
                            </TableCell>
                            <TableCell>
                                Endereço
                            </TableCell>
                            <TableCell>
                                Alas
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
                    { users.map(resposta => 
                        <TableRow key={resposta.id}>
                            <TableCell>
                                {resposta.name}
                            </TableCell> 

                            <TableCell>
                               {resposta.email}  
                            </TableCell>

                            <TableCell>
                               {resposta.active}  
                            </TableCell>

                            <TableCell>
                               {resposta.type}  
                            </TableCell>

                            <TableCell>
                               {resposta.rg}  
                            </TableCell>

                            <TableCell>
                               {resposta.cpf} 
                            </TableCell>

                            <TableCell>
                               {resposta.telefone} 
                            </TableCell>

                            <TableCell>
                               {resposta.endereço} 
                            </TableCell>
                            <TableCell>
                             {resposta.alas ? resposta.alas["name"]: ''}
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

export default Adm;