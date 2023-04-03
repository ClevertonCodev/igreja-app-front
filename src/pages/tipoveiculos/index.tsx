import {
    TextField,
  } from "@mui/material";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import Botao from "../../components/botao";
  import Loader from "../../components/loader";
  import Tipoveiculos from "../tipoveiculos/tipoveiculos";
  import api from "../../services/Instance";
  import HandleInputkey from "../../services/Regexs/HandleInputkey";
  import Layout from "../../components/layout";

const TiPoveiculos = () => {
    const navigate = useNavigate();
    const [estaCarregando, setestaCarregando] = useState<boolean>(false);
    const [tipoVeiculo, setTipoVeiculo] = useState<string>('')
    const data = {
        tipo : tipoVeiculo
    }

    const FormTipoVeiculo = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        setestaCarregando(true);
        api.post('/tiposV', data).then((resposta: { data: Tipoveiculos }) => {
            console.log(resposta.data);    
            setestaCarregando(false);
            alert("Cadastrou com sucesso");
            setTipoVeiculo('')
          })
          .catch((error: string) => {
            alert("Erro inesperado");
            setestaCarregando(false);
          });
        
    }
    
    return(
      <Layout title="Tipo do Veiculo">
        <div>
        {estaCarregando ? (
          <Loader />
        ) : (
          <>
            <h1>Tipo Veiculo</h1>
            <div className="container">
              <form className="FormAlas" onSubmit={FormTipoVeiculo}>
                <TextField
                  type={"text"}
                  value={tipoVeiculo}
                  onChange={(evento) => setTipoVeiculo(evento.target.value)}
                  label="Nome do veiculos"
                  onKeyPress={HandleInputkey}
                  variant="standard"
                  fullWidth
                  required
                />
                <Botao type="submit"> Cadastra </Botao>
              </form>
            </div>
          </>
        )}
      </div>
      </Layout>
    );
}

export default TiPoveiculos