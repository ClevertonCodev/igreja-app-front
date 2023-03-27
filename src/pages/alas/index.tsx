import {
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
import api from "../../services/Instance";
import Estacas from "../users/adm/estacas";
import "./alas.scss";
import HandleInputkey from '../../services/Regexs/HandleInputkey';

const Alas = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [endereço, setEndereço] = useState("");
  const [estacas_id, setEstacas_id] = useState("");
  const { id } = useParams();
  const [paraEstacas, SetParamet] = useState("");
  const [estacas, setEstacas] = useState<Estacas[]>([]);
  const [estaCarregando, setestaCarregando] = useState<boolean>(false);
  const data = {
    name: nome,
    endereço: endereço,
    estacas_id: estacas_id,
  };
  useEffect(() => {
    api.get('/estacas').then((resposta: { data: any }) => {
      setEstacas(resposta.data);
    });
    if (id) {
      setestaCarregando(true);
      api.get(`/alas/${id}`).then((resposta: { data: any }) => {
        SetParamet(resposta.data);
        setNome(resposta.data.name);
        setEstacas_id(resposta.data.estacas_id);
        setEndereço(resposta.data.endereço);
        setestaCarregando(false);
      });
    }
  }, [id]);

  const FormAlas = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setestaCarregando(true);
    if (id) {
      api.patch(`/alas/${id}`, data)
        .then((response: { data: any }) => {
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
      api.post('alas', data)
        .then((response: { data: any }) => {
          if (response.data) {
            alert("cadastrado com sucesso");
            setNome('')
            setEndereço("");
            setEstacas_id("");
            setestaCarregando(false);
          }
        })
        .catch(function (error) {
          if (error) {
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
          <h1>Alas</h1>
          <div className="container">
            <form className="FormAlas" onSubmit={FormAlas}>
              <TextField
                type={"text"}
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                onKeyPress={HandleInputkey}
                label="Nome da Ala"
                variant="standard"
                fullWidth
                required
              />
              <TextField
                type={"text"}
                value={endereço}
                onChange={(evento) => setEndereço(evento.target.value)}
                label="Endereço"
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
                  Estacas
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  type={"text"}
                  value={estacas_id}
                  label="Estacas"
                  required
                  variant="standard"
                  onChange={(evento) =>
                    setEstacas_id(evento.target.value as any)
                  }
                >
                  {estacas.map((resposta) => (
                    <MenuItem key={resposta.id} value={resposta.id}>
                      {resposta.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Botao type="submit">
                {paraEstacas ? "Atualizar" : "Cadastra"}
              </Botao>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Alas;
