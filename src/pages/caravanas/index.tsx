import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Botao from "../../components/botao";
import Navbar from "../../components/navbar";
import Token from "../../components/token";
import Estacas from "../users/adm/estacas";


const Caravanas = () => {
    const [nome, setNome] = useState('');
    const [destino, setDestino] = useState('');
    const [quantidade_passageiros, setQuantidadep] = useState('');
    const [dataHora_partida, setDataHora_partida] = useState('');
    const [dataHora_retorno, setDataHora_retorno] = useState('');
    var [status, setStatus] = useState('');
    const [estacas_id, setEstacas_id] = useState('');
    const [paramentros, setParamentros] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [estacas, setEstacas] = useState<Estacas[]>([])
    const data = {

        Nome: nome,
        Destino: destino,
        Quantidade_passageiros: quantidade_passageiros,
        DataHora_partida: dataHora_partida,
        DataHora_retorno: dataHora_retorno,
        Status: status,
        estacas_id: estacas_id,

    }
    if(status == ''){
        setStatus ('Ativa')
    }
    
    const voltar = () => {
        navigate('home');
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/v1/estacas`,
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }

        })

            .then((resposta: { data: any; }) => {
                setEstacas(resposta.data)


            })

        if (id) {


            axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/v1/caravanas/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': Token()
                }

            })

                .then((resposta: { data: any; }) => {
                    setParamentros(resposta.data);
                    setNome(resposta.data.Nome);
                    setDestino(resposta.data.Destino);
                    setQuantidadep(resposta.data.Quantidade_passageiros);
                    setDataHora_partida(resposta.data.DataHora_partida);
                    setDataHora_retorno(resposta.data.DataHora_retorno);
                    setStatus(resposta.data.Status);
                    setEstacas_id(resposta.data.estacas_id);
                    console.log(resposta.data)
                })
        }
    }, [id]);

    function FormCaravanas(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (id) {
            axios({
                method: 'patch',
                url: `http://127.0.0.1:8000/api/v1/caravanas/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': Token()
                },
                data: data
            })
                .then((response: { data: any; }) => {
                    if (response.data) {
                        alert('Atualizou com sucesso!');
                        navigate("/adm/caravanas")
                    }
                })

                .catch(function (error) {
                    console.log(error)
                });

        } else {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/caravanas',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': Token()
                },

                data: data
            })
                .then((response: { data: any; }) => {
                    if (response.data) {
                        alert('cadastrou com sucesso!');
                        setParamentros('');
                        setNome('');
                        setDestino('');
                        setQuantidadep('');
                        setDataHora_partida('');
                        setDataHora_retorno('');
                        setStatus('');
                        setEstacas_id('');
                    }
                })

                .catch(function (error) {
                    console.log(error);
                    if (error?.response?.data?.errors?.Status) {
                        alert(error.response.data.errors.Status);
                    }
                   


                });
        }
    }
    return (
        <div>
            <Navbar />
            <div className="containeer">
                <form onSubmit={FormCaravanas} >
                    <div className="left">
                        <TextField

                            type={"text"}
                            value={nome}
                            onChange={evento => setNome(evento.target.value)}
                            label="Nome do destino"
                            variant="outlined"
                            required
                        />

                        <TextField

                            type={"text"}
                            value={destino}
                            onChange={evento => setDestino(evento.target.value)}
                            label="Destino"
                            variant="outlined"
                            required
                        />
                        <TextField

                            type={"number"}
                            value={quantidade_passageiros}
                            onChange={evento => setQuantidadep(evento.target.value)}
                            label="Quantidade de passageiros"
                            variant="outlined"
                            required
                        />

                        <TextField
                            id="datetime-local"
                            label="Data e Hora da partida"
                            type="datetime-local"
                            value={dataHora_partida}
                            required
                            onChange={evento => setDataHora_partida(evento.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </div>

                    <div className="right" >

                    <TextField
                            id="datetime-local"
                            label="Data e Hora do retorno"
                            type="datetime-local"
                            value={dataHora_retorno}
                            required
                            onChange={evento => setDataHora_retorno(evento.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormControl>
                            <InputLabel required id="demo-simple-select-label">A caravana é ativa?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="status"
                                required
                                onChange={evento => setStatus(evento.target.value)}
                            >
                                <MenuItem value={'Ativa'}>Ativa</MenuItem>
                                <MenuItem value={'Inativa'}>Inativa</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel required id="demo-simple-select-label">Estacas</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={estacas_id}
                                label="Estacas"
                                required
                                onChange={evento => setEstacas_id(evento.target.value as any)}
                            >
                                {estacas.map((resposta) =>
                                    <MenuItem key={resposta.id}
                                        value={resposta.id}>{resposta.nome}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="botão">
                        <Botao type='submit'>
                            {paramentros ? 'Atualizar' : 'Cadastrar'}
                        </Botao>

                        <Botao onClick={() => voltar()} >
                            Voltar
                        </Botao>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Caravanas;