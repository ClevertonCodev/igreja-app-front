import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Botao from "../../components/botao";
import "./login.scss";
import Header from "../../components/header";
import Loader from "../../components/loader";
import { refreshToken } from "../../services/RefreshToken";

const Login = () => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [estaCarregando, setestaCarregando] = useState<boolean>(false);
    var newToken;
    var Tokenrefresh: number = 0 
    
    const trueLoogin = () => {
        TokenNew()
        navigate('/home');
    }

    const TokenNew = () => {
        Tokenrefresh = 7200000; // Tempo em milissegundos
        newToken = setInterval(() => {refreshToken()}, Tokenrefresh);
        if(newToken){
           console.log(refreshToken())
        }

        
    }

    const FormLogin = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); //ñ reseta a pagina
        setestaCarregando(true);
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

            .then((response: { data: {token: string} }) => {
                if (response.data) {
                    document.cookie = 'token=' + response.data.token;
                    trueLoogin()
                }
            })
            .catch(function (error) {
                if (error.response?.data?.erro) {
                    alert(error.response.data.erro)
                    setestaCarregando(false);
                }
            });
    }

    return (
        <div>
            <Header />
            {estaCarregando? 
                <Loader/> :
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
                    <Botao type="submit">
                        Entrar
                    </Botao>
                </form>
               
            </div>
             }
        </div>
    );
}

export default Login;


