import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Botao from "../../components/botao";
import Header from "../../components/header";
import Token from "../../components/token";
import Estacas from "../users/adm/estacas";

const Alas = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [endereço, setEndereço] = useState('');
    const [estacas_id, setEstacas_id] = useState('');
    const { id } = useParams();
    const [paraEstacas, SetParamet] = useState('');
    const [estacas, setEstacas] = useState<Estacas[]>([])
    const data = {
        name: nome,
        endereço: endereço,
        estacas_id: estacas_id
    }

    console.log(data)

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
                url: `http://127.0.0.1:8000/api/v1/alas/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': Token()
                }

            })

                .then((resposta: { data: any; }) => {
                    SetParamet(resposta.data)
                    setNome(resposta.data.name)
                    setEstacas_id(resposta.data.estacas_id)
                    setEndereço(resposta.data.endereço)


                })
        }
    }, [id]);

    const FormEstacas = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (id) {
            axios({
                method: 'patch',
                url: `http://127.0.0.1:8000/api/v1/alas/${id}`,
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
                        navigate("/adm/alas")
                    }
                })

                .catch(function (error) {
                    console.log(error)
                });

        } else {

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/alas',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': Token()
                },
                data: data
            })


                .then((response: { data: any; }) => {

                    if (response.data) {
                        alert('cadastrado com sucesso')
                        navigate("/home")

                    }
                })
                .catch(function (error) {
                    if (error) {
                        console.log(error)
                        alert(error.response.data.erro)
                         console.log(error.response.data.erro)
                    }
                });

        }


    }

    return (
        <div>
            <Header />
            <div className="container">

                <h1>alas</h1>
                <form className="Form" onSubmit={FormEstacas}>
                    <TextField
                        type={"text"}
                        value={nome}
                        onChange={evento => setNome(evento.target.value)}
                        label="Nome da Ala"
                        variant="standard"
                        fullWidth
                        required />
                    <TextField
                        type={"text"}
                        value={endereço}
                        onChange={evento => setEndereço(evento.target.value)}
                        label="Endereço"
                        variant="standard"
                        fullWidth
                        required />

                    <FormControl fullWidth>
                        <InputLabel  required id="demo-simple-select-label">Estacas</InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            type={"text"}
                            value={estacas_id}
                            label="Estacas"
                            required
                            onChange={evento => setEstacas_id(evento.target.value as any)}
                        >
                            {estacas.map((resposta) =>
                                <MenuItem key={resposta.id}
                                value={resposta.id}>
                                {resposta.nome}
                                </MenuItem>
                            )}
                        </Select>

                    </FormControl>

                    <Botao type="submit">
                        {paraEstacas ? 'Atualizar' : 'Cadastra'}
                    </Botao>
                </form>
            </div>
        </div>
    );
}

export default Alas