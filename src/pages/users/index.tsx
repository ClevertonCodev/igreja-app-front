import { Button, FormControl, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react"
import Botao from "../../components/botao";
import "./users.scss"
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Token from "../../components/token";
import Alas from "./adm/alas";
import Navbar from "../../components/navbar";



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
    const [alas_id, setAlasid] = useState('');
    const { id } = useParams();
    const [paramentros, setParamentros] = useState('');
    const navigate = useNavigate();
    const [alas, setAlas] = useState<Alas[]>([]);
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
    const location = useLocation();
    const url = location.pathname;
    const voltar = () => {
        navigate('/adm/user');
    }
    useEffect(() => {

        if (url == '/me') {

            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/me',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': Token()
                }
            })
                .then((response: { data: any; }) => {
                    setParamentros(response.data);
                    setName(response.data.name);
                    setEmail(response.data.email);
                    setType(response.data.type);
                    setActive(response.data.active);
                    setRg(response.data.rg);
                    setCpf(response.data.cpf);
                    setTelefone(response.data.telefone);
                    setEndereço(response.data.endereço);
                    setAlasid(response.data.alas_id);
                    setPassword(response.data.password);
                })
                .catch(function (error) {

                });
        }


        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/v1/alas`,
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }

        })

            .then((resposta: { data: any; }) => {
                setAlas(resposta.data);


            })

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
                    setParamentros(resposta.data);
                    setName(resposta.data.name);
                    setEmail(resposta.data.email);
                    setType(resposta.data.type);
                    setActive(resposta.data.active);
                    setRg(resposta.data.rg);
                    setCpf(resposta.data.cpf);
                    setTelefone(resposta.data.telefone);
                    setEndereço(resposta.data.endereço);
                    setAlasid(resposta.data.alas_id);
                    setPassword(resposta.data.password);

                })
        }
    }, [id]);

    function handleInputkey(event: React.KeyboardEvent<HTMLInputElement>) {
        const input = event.currentTarget;
        if (/[0-9]/.test(event.key)) {
          event.preventDefault();
          console.log(event.key)
          return;
        }
      }
console.log(name);
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
                        alert('Atualizou com sucesso!');
                        navigate("/adm/user")
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
                        alert('cadastrou com sucesso!');
                        setName('');
                        setEmail('');
                        setType('');
                        setActive('');
                        setRg('');
                        setCpf('');
                        setTelefone('');
                        setEndereço('');
                        setAlasid('');
                        setPassword('');
                    }
                })

                .catch(function (error) {
                    if (error?.response?.data?.errors?.cpf) {
                        alert(error.response.data.errors.cpf);
                    }
                    if (error?.response?.data?.errors?.email) {
                        alert(error.response.data.errors.email);
                    }
                    if (error?.response?.data?.erro) {
                        alert(error.response.data.erro);
                    }

                       
                    
                });
        }
    }
    return (
        <div>
            <Navbar />
            <div className="containeer">
                <form onSubmit={FormUser} >
                    <div className="left">
                        <TextField

                            type={"text"}
                            value={name}
                            onKeyPress={handleInputkey}
                            onChange={evento => setName(evento.target.value)}
                            label="Nome"
                            variant="outlined"
                            required
                        />

                        <TextField

                            type={"password"}
                            value={password}
                            onChange={evento => setPassword(evento.target.value)}
                            label="Senha"
                            variant="outlined"
                            required
                        />
                        <TextField

                            type={"email"}
                            value={email}
                            onChange={evento => setEmail(evento.target.value)}
                            label="Email"
                            variant="outlined"
                            required
                        />
                        <FormControl>
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
                        <FormControl >
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
                    </div>

                    <div className="right" >

                        <TextField
                            type={"text"}
                            value={rg}
                            onChange={evento => setRg(evento.target.value)}
                            label="RG"
                            variant="outlined"
                            required
                        />
                        <TextField
                            type={"text"}
                            value={cpf}
                            onChange={evento => setCpf(evento.target.value)}
                            label="CPF"
                            variant="outlined"
                            required
                        />
                        <TextField
                            type={"text"}
                            value={telefone}
                            onChange={evento => setTelefone(evento.target.value)}
                            label="Telefone"
                            variant="outlined"
                            required
                        />
                        <TextField
                            type={"text"}
                            value={endereço}
                            onChange={evento => setEndereço(evento.target.value)}
                            label="Endereço"
                            variant="outlined"
                            required
                        />
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Ala</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={alas_id}
                                label="alas"
                                onChange={evento => setAlasid(evento.target.value as any)}
                            >
                                {alas.map((resposta) =>
                                    <MenuItem key={resposta.id}
                                        value={resposta.id}>{resposta.name}</MenuItem>
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

export default Users;