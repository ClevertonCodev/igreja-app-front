import { Button } from "@mui/material";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import Users from './users';
import '../users.scss'
import Loader from "../../../components/loader";
import api from "../../../services/Instance";

const AdmUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<Users[]>([])
    const [estaCarregando, setestaCarregando] = useState<boolean>(false);
    const [reloud, setestaReloud] = useState<boolean>(false);
    
    useEffect(() => {
        setestaCarregando(true);
        api.get('/users')
            .then((resposta: { data: any; }) => {
                setUsers(resposta.data)
                setestaCarregando(false);
            })

    }, [reloud]);

    const excluir = (userExcluir: Users) => {
        setestaCarregando(true);
        setestaReloud(false);
        api.delete(`/users/${userExcluir.id}`)
            .then((excluir: { data: any; }) => {
                setestaCarregando(true);
                setestaReloud(true);
                if (excluir.data.msg) {
                    alert(excluir.data.msg)
                }

            });
    }

    const editar = (editar: Users) => {
        if (editar.id) {
            navigate(`/adm/user/${editar.id}`)
        }

    }


    return (
        <div>
            <Navbar />
            { estaCarregando?<Loader/>:
            <div className="rolagem">

                <table className="table" >
                    <thead className="thead">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Rg</th>
                            <th scope="col">CPF</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Alas</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(resposta =>
                            <tr className="tr" key={resposta.id}>

                                <td >{resposta.name}</td>
                                <td> {resposta.email}</td>
                                <td> {resposta.active? 'Ativo': 'Inativo'}</td>
                                <td> {resposta.type}</td>
                                <td> {resposta.rg}</td>
                                <td> {resposta.cpf}</td>
                                <td> {resposta.telefone}</td>
                                <td> {resposta.endereço}</td>
                                <td> {resposta.alas ? resposta.alas["name"] : ''}</td>
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

export default AdmUser;