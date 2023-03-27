import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import Botao from "../../components/botao";
import Loader from "../../components/loader";
import Navbar from "../../components/navbar";
import api from "../../services/Instance";
import HandleInputkey from "../../services/Regexs/HandleInputkey";
import Estacas from "../users/adm/estacas";

const Caravanas = () => {
  const [nome, setNome] = useState("");
  const [destino, setDestino] = useState("");
  const [quantidade_passageiros, setQuantidadep] = useState("");
  const [dataHora_partida, setDataHora_partida] = useState("");
  const [dataHora_retorno, setDataHora_retorno] = useState("");
  var [status, setStatus] = useState("");
  const [estacas_id, setEstacas_id] = useState("");
  const [paramentros, setParamentros] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [estacas, setEstacas] = useState<Estacas[]>([]);
  const [estaCarregando, setestaCarregando] = useState<boolean>(false);
  const data = {
    Nome: nome,
    Destino: destino,
    Quantidade_passageiros: quantidade_passageiros,
    DataHora_partida: dataHora_partida,
    DataHora_retorno: dataHora_retorno,
    Status: status,
    estacas_id: estacas_id,
  };
  if (status == "") {
    setStatus("Ativa");
  }

  const voltar = () => {
    navigate("home");
  };
  
  useEffect(() => {
    api.get("/estacas").then((resposta: { data: Estacas[] }) => {
      setEstacas(resposta.data);
    });

    if (id) {
        setestaCarregando(true)
      api.get(`caravanas/${id}`).then((resposta: { data: any }) => {
        setParamentros(resposta.data);
        setNome(resposta.data.Nome);
        setDestino(resposta.data.Destino);
        setQuantidadep(resposta.data.Quantidade_passageiros);
        setDataHora_partida(resposta.data.DataHora_partida);
        setDataHora_retorno(resposta.data.DataHora_retorno);
        setStatus(resposta.data.Status);
        setEstacas_id(resposta.data.estacas_id);
        setestaCarregando(false)
      });
    }
  }, [ ]);

  function FormCaravanas(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setestaCarregando(true)
    if (id) {
      api.patch(`/caravanas/${id}`, data).then((response: { data: any }) => {
          if (response.data) {
            setestaCarregando(false)
            alert("Atualizou com sucesso!");
            navigate("/adm/caravanas");
          }
        })

        .catch(function (error) {
          console.log(error);
          setestaCarregando(false);
          alert("erro inesperado");
        });
    } else {
      api.post("/caravanas", data ).then((response: { data: any }) => {
          if (response.data) {
            setestaCarregando(false)
            alert("cadastrou com sucesso!");
            setParamentros("");
            setNome("");
            setDestino("");
            setQuantidadep("");
            setDataHora_partida("");
            setDataHora_retorno("");
            setStatus("");
            setEstacas_id("");
          }
        })

        .catch(function (error) {
          alert("erro inesperado");
          if (error?.response?.data?.errors?.Status) {
            alert(error.response.data.errors.Status);
          }
        });
    }
  }
  return (
    <div>
      <Navbar />
      {estaCarregando ? (
        <Loader />
      ) : (
        <>
        <h1 id="caravanas" >Caravanas</h1>
        <div className="containeer">
            <form onSubmit={FormCaravanas}>
              <div className="left">
                <TextField
                  type={"text"}
                  onKeyPress={HandleInputkey}
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  label="Nome do lider"
                  variant="outlined"
                  required />

                <TextField
                  type={"text"}
                  value={destino}
                  onKeyPress={HandleInputkey}
                  onChange={(evento) => setDestino(evento.target.value)}
                  label="Destino"
                  variant="outlined"
                  required />

                <TextField
                  type={"number"}
                  value={quantidade_passageiros}
                  onChange={(evento) => setQuantidadep(evento.target.value)}
                  label="Quantidade de passageiros"
                  variant="outlined"
                  required />

                <TextField
                  id="datetime-local"
                  label="Data e Hora da partida"
                  type="datetime-local"
                  value={dataHora_partida}
                  required
                  onChange={(evento) => setDataHora_partida(evento.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }} />
              </div>

              <div className="right">
                <TextField
                  id="datetime-local"
                  label="Data e Hora do retorno"
                  type="datetime-local"
                  value={dataHora_retorno}
                  required
                  onChange={(evento) => setDataHora_retorno(evento.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }} />

                <FormControl>
                  <InputLabel required id="demo-simple-select-label">
                    A caravana é ativa?
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="status"
                    required
                    onChange={(evento) => setStatus(evento.target.value)}
                  >
                    <MenuItem value={"Ativa"}>Ativa</MenuItem>
                    <MenuItem value={"Inativa"}>Inativa</MenuItem>
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel required id="demo-simple-select-label">
                    Estacas
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={estacas_id}
                    label="Estacas"
                    required
                    onChange={(evento) => setEstacas_id(evento.target.value)}
                  >
                    {estacas.map((resposta) => (
                      <MenuItem key={resposta.id} value={resposta.id}>
                        {resposta.nome}
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
          </div></>
      )}
    </div>
  );
};
export default Caravanas;
