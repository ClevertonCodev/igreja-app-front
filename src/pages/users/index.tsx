import {FormControl, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import Botao from "../../components/botao";
import "./users.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alas from "./adm/alas";
import Navbar from "../../components/navbar";
import Loader from "../../components/loader";
import HandleInputkey from "../../services/Regexs/HandleInputkey";
import api from "../../services/Instance";
import HandlerCpf from "../../services/Regexs/HandlerCPF";
import HandleRG from "../../services/Regexs/HandleRG";
import HandleMobileNumber from "../../services/Regexs/HandleMobileNumber";

const Users = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");
  const [type, setType] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereço, setEndereço] = useState("");
  const [alas_id, setAlasid] = useState("");
  const [userId, setUserId] = useState("");
  var { id } = useParams();
  const [paramentros, setParamentros] = useState("");
  const navigate = useNavigate();
  const [alas, setAlas] = useState<Alas[]>([]);
  const [estaCarregando, setestaCarregando] = useState<boolean>(false);
  const data = {
    name: name,
    password: password,
    email: email,
    active: active,
    type: type,
    rg: rg.replace(/\D/g, ""),
    cpf: cpf.replace(/\D/g, ""),
    telefone: telefone.replace(/\D/g, ""),
    endereço: endereço,
    alas_id: alas_id,
  };
  const location = useLocation();
  const url = location.pathname;
  console.log(data);
  const voltar = () => {
    navigate("/adm/user");
  };

  if (userId) {
    id = userId;
  }

  useEffect(() => {
    if (url == "/me") {
      setestaCarregando(true);
      api
        .get("/me")
        .then((response: { data: any }) => {
          setUserId(response.data.id);
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
          setestaCarregando(false);
        })
        .catch(function (error) {
          alert("Erro inesperado");
          setestaCarregando(false);
        });
    }

    api.get("/alas").then((resposta: { data: any }) => {
      setAlas(resposta.data);
    });

    if (id) {
      api.get(`/users/${id}`).then((resposta: { data: any }) => {
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
        setestaCarregando(false);
      });
    }
  }, [id]);

  const handleChangeCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(HandlerCpf(event.target.value));
  }
  
  const handleChangeRG = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setRg(HandleRG(event.target.value));
  };
 
  const handleNumberMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(HandleMobileNumber(event.target.value));
  };
  

  function FormUser(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setestaCarregando(true);
    if (id) {
      api
        .patch(`users/${id}`, data)
        .then((response: { data: any }) => {
          if (response.data) {
            alert("Atualizou com sucesso!");
            navigate("/adm/user");
          }
        })

        .catch(function (error) {
          console.log(error);
          setestaCarregando(false);
          alert("erro inesperado");
        });
    } else {
      api
        .post("/users", data)
        .then((response: { data: any }) => {
          if (response.data) {
            alert("cadastrou com sucesso!");
            setName("");
            setEmail("");
            setType("");
            setActive("");
            setRg("");
            setCpf("");
            setTelefone("");
            setEndereço("");
            setAlasid("");
            setPassword("");
            setestaCarregando(false);
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
          alert("erro inesperado");
          setestaCarregando(false);
        });
    }
  }
  return (
    <div>
      <Navbar />
      {estaCarregando ? (
        <Loader />
      ) : (
        <div className="containeer">
          <form onSubmit={FormUser}>
            <div className="left">
              <TextField
                type={"text"}
                value={name}
                onKeyPress={HandleInputkey}
                onChange={(evento) => setName(evento.target.value)}
                label="Nome"
                variant="outlined"
                required
              />

              <TextField
                type={"password"}
                value={password}
                onChange={(evento) => setPassword(evento.target.value)}
                label="Senha"
                variant="outlined"
                required
              />
              <TextField
                type={"email"}
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                label="Email"
                variant="outlined"
                required
              />
              <FormControl>
                <InputLabel required id="demo-simple-select-label">
                  O membro é ativo?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={active}
                  label="active"
                  required
                  onChange={(evento) => setActive(evento.target.value)}
                >
                  <MenuItem value={1}>Sim</MenuItem>
                  <MenuItem value={0}>Não</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel required id="demo-simple-select-label">
                  Tipo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="type"
                  required
                  onChange={(evento) => setType(evento.target.value as any)}
                >
                  <MenuItem value="super">Super</MenuItem>
                  <MenuItem value="secretarios">Secretário</MenuItem>
                  <MenuItem value="comum">Comum</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="right">
              <TextField
                type={"text"}
                value={rg}
                onChange={handleChangeRG}
                label="RG"
                variant="outlined"
                required
              />
              <TextField
                type={"text"}
                value={cpf}
                onChange={handleChangeCpf}
                label="CPF"
                variant="outlined"
                required
              />
              <TextField
                type={"text"}
                value={telefone}
                onChange={handleNumberMobile}
                label="Telefone"
                variant="outlined"
                required
              />
              <TextField
                type={"text"}
                value={endereço}
                onChange={(evento) => setEndereço(evento.target.value)}
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
                  onChange={(evento) => setAlasid(evento.target.value as any)}
                >
                  {alas.map((resposta) => (
                    <MenuItem key={resposta.id} value={resposta.id}>
                      {resposta.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="botão">
              <Botao type="submit">
                {paramentros ? "Atualizar" : "Cadastrar"}
              </Botao>

              <Botao onClick={() => voltar()}>Voltar</Botao>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
