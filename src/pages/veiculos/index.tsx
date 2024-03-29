import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Botao from "../../components/botao";
import Loader from "../../components/loader";
import Navbar from "../../components/navbar";
import Tipoveiculos from "../tipoveiculos/tipoveiculos";
import veiculos from "./veiculos";
import api from "../../services/Instance";
import HandleInputkey from "../../services/Regexs/HandleInputkey";

const Veiculos = () => {
  const navigate = useNavigate();
  const [estaCarregando, setestaCarregando] = useState<boolean>(false);
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [tipoveiculos, setTipoVeiculos] = useState<Tipoveiculos[]>([]);
  const [quatidadesLugares, setQuantidadesLugares] = useState<number>();
  const [tipo_veiculos_id, setTipoV_id] = useState<number>();
  const data = {
    name: name,
    tipo_veiculos_id: tipo_veiculos_id,
    quantidade_lugares: quatidadesLugares,
  };
  useEffect(() => {
    api.get("tiposV").then((resposta: { data: Tipoveiculos[] }) => {
      setTipoVeiculos(resposta.data);
    });
    if (id) {
      setestaCarregando(true);
      api.get(`/veiculos/${id}`).then((resposta: { data: veiculos }) => {
        setName(resposta.data.name);
        setTipoVeiculos(resposta.data.tipo_veiculos_id);
        setQuantidadesLugares(resposta.data.quantidade_lugares);
        setestaCarregando(false);
      });
    }
  }, [id]);
 

  const FormVeiculos = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setestaCarregando(true);
    if (id) {
      api
        .patch(`/veiculos/${id}`, data)
        .then((response: { data: veiculos }) => {
          if (response.data) {
            alert("Atualizou com sucesso!");
            navigate("/adm/alas");
          }
        })
        .catch(function (error) {
          console.log(error);
          setestaCarregando(false);
        });
    } else {
      api
        .post("/veiculos", data)
        .then((response: { data: veiculos }) => {
          if (response.data) {
            alert("cadastrado com sucesso");
            setName("");
            setTipoV_id(undefined);
            setQuantidadesLugares(undefined);
            setestaCarregando(false);
          }
        })
        .catch(function (error) {
          if (error) {
            console.log(error);
            alert(error.response.data.erro);
            setestaCarregando(false);
          }
        });
    }
  };

  return (
    <div>
      <Navbar />
      {estaCarregando ? (
        <Loader />
      ) : (
        <>
          <h1>Veiculo</h1>
          <div className="container">
            <form className="FormAlas" onSubmit={FormVeiculos}>
              <TextField
                type={"text"}
                value={name}
                onChange={(evento) => setName(evento.target.value)}
                label="Nome do veiculos"
                onKeyPress={HandleInputkey}
                variant="standard"
                fullWidth
                required
              />
              <TextField
                type={"number"}
                value={quatidadesLugares}
                onChange={(evento) =>
                  setQuantidadesLugares(Number(evento.target.value))
                }
                label="Quatidades de Lugares"
                variant="standard"
                fullWidth
                required
              />

              <FormControl fullWidth>
                <InputLabel
                  variant="standard"
                  required
                  id="demo-simple-select-label"
                >
                  Tipo Veiculos
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  type={"number"}
                  value={tipo_veiculos_id}
                  label="Tipo Veiculos"
                  required
                  variant="standard"
                  onChange={(evento) =>
                    setTipoV_id(Number(evento.target.value))
                  }
                >
                  {tipoveiculos.map((resposta) => (
                    <MenuItem key={resposta.id} value={resposta.id}>
                      {resposta.tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Botao type="submit">{id ? "Atualizar" : "Cadastra"}</Botao>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Veiculos;
