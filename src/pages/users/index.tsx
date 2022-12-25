import { FormControl, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react"
import Botao from "../../components/botao";
import "./users.scss"
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Token from "../../components/token";



const Users = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [active, setActive] = useState('');
    const [type, setType] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereço, setEndereço] = useState('');
    const [alas_id, setAlas] = useState('');
    const { id } = useParams();
    const [paramentros, setParamentros] = useState('');
    const navigate = useNavigate();
    const data = {

        name: name,
        password: password,
        email: email,
        active: active,
        type: type,
        rg: rg,
        cpf: cpf,
        telefone: telefone,
        endereço: endereço,
        alas_id: alas_id

    }

    useEffect(() => {
        if (id) {


            axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/v1/users/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': Token()
                }

            })

                .then((resposta: { data: any; }) => {
                    setParamentros(resposta.data)
                    setName(resposta.data.name)
                    setEmail(resposta.data.email)
                    setType(resposta.data.type)
                    setActive(resposta.data.active)
                    setRg(resposta.data.rg)
                    setCpf(resposta.data.cpf)
                    setTelefone(resposta.data.telefone)
                    setEndereço(resposta.data.endereço)
                    setAlas(resposta.data.alas_id)

                })
        }
    }, [id]);



    function FormUser(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (id) {
            axios({
                method: 'patch',
                url: `http://127.0.0.1:8000/api/v1/users/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': Token()
                },
                data: data
            })
                .then((response: { data: any; }) => {
                    if (response.data) {
                        console.log(response.data);
                        alert('Atualizou com sucesso!');
                        navigate("/adm")
                    }
                })

                .catch(function (error) {
                    console.log(error)
                });

        } else {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/users',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': Token()
                },

                data: data
            })
                .then((response: { data: any; }) => {
                    if (response.data) {
                        console.log(response.data);
                        alert('cadastrou com sucesso!');
                    }
                })

                .catch(function (error) {
                    if (error.response.data.errors.cpf) {
                        alert(error.response.data.errors.cpf);
                    }
                    if (error.response.data.errors.email) {
                        alert(error.response.data.errors.email);
                    }
                    if (error.response.data.erro) {
                        alert(error.response.data.erro);
                    }
                });
        }
    }
    return (
        <div className="containeer">

            <form onSubmit={FormUser} >


                <TextField
                    type={"text"}
                    value={name}
                    onChange={evento => setName(evento.target.value)}
                    label="nome"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"password"}
                    value={password}
                    onChange={evento => setPassword(evento.target.value)}
                    label="senha"
                    variant="outlined"
                    fullWidth
                    required={paramentros ? false : true}

                />
                <TextField
                    type={"email"}
                    value={email}
                    onChange={evento => setEmail(evento.target.value)}
                    label="email"
                    variant="outlined"
                    fullWidth
                    required
                />

                <FormControl fullWidth>
                    <InputLabel required id="demo-simple-select-label">O membro é ativo?</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={active}
                        label="active"
                        required
                        onChange={evento => setActive(evento.target.value)}
                    >
                        <MenuItem value={1}>Sim</MenuItem>
                        <MenuItem value={0}>Não</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel required id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        required
                        onChange={evento => setType(evento.target.value as any)}
                    >
                        <MenuItem value='super'>Super</MenuItem>
                        <MenuItem value='secretarios'>Secretário</MenuItem>
                        <MenuItem value='comum'>Comum</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type={"text"}
                    value={rg}
                    onChange={evento => setRg(evento.target.value)}
                    label="RG"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"text"}
                    value={cpf}
                    onChange={evento => setCpf(evento.target.value)}
                    label="CPF"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"text"}
                    value={telefone}
                    onChange={evento => setTelefone(evento.target.value)}
                    label="Telefone"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"text"}
                    value={endereço}
                    onChange={evento => setEndereço(evento.target.value)}
                    label="Endereço"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"text"}
                    value={alas_id}
                    onChange={evento => setAlas(evento.target.value)}
                    label="Alas_id"
                    variant="outlined"
                    fullWidth
                />

                <Botao type='submit'>
                    Enviar
                </Botao>

            </form>
        </div>
    );

}

export default Users;