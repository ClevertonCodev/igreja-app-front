import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../../components/botao";
import "./login.scss";
import Header from "../../components/header";
import Loader from "../../components/loader";


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [estaCarregando, setestaCarregando] = useState<boolean>(false);

  const trueLoogin = () => {
    navigate("/home");
  };

  const FormLogin = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setestaCarregando(true);
    axios.post("http://127.0.0.1:8000/api/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: { data: { token: string; refresh_token: string } }) => {
        if (response.data) {
          document.cookie = "token=" + response.data.token;
          document.cookie = "refreshtoken=" + response.data.refresh_token;
          trueLoogin();
        }
      })
      .catch(function (error) {
        setestaCarregando(false);
        if(error.response.status === 500){
          alert("Erro no servidor");
        }
        if (error.response?.data?.erro) {
          alert(error.response.data.erro);
          setestaCarregando(false);
        }
      });
  };

  return (
    <div>
      <title>Login</title>
      <Header />
      {estaCarregando ? (
        <Loader />
      ) : (
        <div className="container">
          <form className="Form" onSubmit={FormLogin}>
            <TextField
              type={"email"}
              value={email}
              onChange={(evento) => setemail(evento.target.value)}
              label="Email"
              variant="standard"
              fullWidth
              required
            />
            <TextField
              type={"password"}
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
              label="Senha"
              variant="standard"
              fullWidth
              required
            />
            <Botao type="submit">Entrar</Botao>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
