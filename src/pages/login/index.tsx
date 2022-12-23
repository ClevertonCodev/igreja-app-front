import TextField from "@mui/material/TextField";
import axios from "axios";
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Botao from "../../components/botao";
import "./login.scss";
import Header from "../../components/header";
import Checkbox from "@mui/material/Checkbox";




const Login = () => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const FormLogin = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); //ñ reseta a pagina

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/login',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                email: email,
                password: password
            }
        })


            .then((response: { data: any; }) => {

                if (response.data) {
                    document.cookie = 'token=' + response.data.token;
                    document.cookie = 'name=' + response.data.name;
                    navigate("/home")
                    window.location.reload()

                }
            })
            .catch(function (error) {
                if (error) {
                    alert(error.response.data.erro)
                    console.log(error.response.data.erro)
                }
            });

    }


    return (
        <div>
            <Header />
            <div className="container">


                <form className="Form" onSubmit={FormLogin}>
                    <TextField
                        type={"email"}
                        value={email}
                        onChange={evento => setemail(evento.target.value)}
                        label="Email"
                        variant="standard"
                        fullWidth
                        required />
                    <TextField
                        type={"password"}
                        value={password}
                        onChange={evento => setPassword(evento.target.value)}
                        label="Senha"
                        variant="standard"
                        fullWidth
                        required />
                    {/* <Checkbox  defaultChecked /> */}
                    <Botao type="submit">
                        Entrar
                    </Botao>
                </form>
            </div>
        </div>
    );
}

export default Login;


