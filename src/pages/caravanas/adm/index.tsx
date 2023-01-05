import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import Token from "../../../components/token";
import '../../users/users.scss'
import Caravana from './caravanas';

const AdmCaravanas = () => {
    const navigate = useNavigate();
    const [caravanas, setCaravanas] = useState<Caravana[]>([])
    
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/v1/caravanas',
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }

        })
            .then((resposta: { data: any; }) => {
                setCaravanas(resposta.data)
            })

    }, []);

    const excluir = (caravanaExcluir: Caravana) => {
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/v1/caravanas/${caravanaExcluir.id}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }

        })
            .then((excluir: { data: any; }) => {
                if (excluir.data.msg) {
                    alert(excluir.data.msg)
                    window.location.reload()
                }

            });
    }

    const editar = (editar: Caravana) => {
        if (editar.id) {
            navigate(`/adm/caravanas/${editar.id}`)
        }

    }


    return (
        <div>
            <Navbar />
            <div className="rolagem">

                <table className="table" >
                    <thead className="thead">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Destino</th>
                            <th scope="col">Quantidade de passageiros</th>
                            <th scope="col">Data e Hora de partida</th>
                            <th scope="col">Data e Hora de rertono</th>
                            <th scope="col">Status</th>
                            <th scope="col">Estacas</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {caravanas.map(resposta =>
                            <tr className="tr" key={resposta.id}>

                                <td >{resposta.Nome}</td>
                                <td> {resposta.Destino}</td>
                                <td> {resposta.Quantidade_passageiros}</td>
                                <td> {resposta.DataHora_partida}</td>
                                <td> {resposta.DataHora_retorno}</td>
                                <td> {resposta.Status}</td>
                                <td> 
                                    {resposta.estacas["nome"]}
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
        </div>
    );

}

export default AdmCaravanas;