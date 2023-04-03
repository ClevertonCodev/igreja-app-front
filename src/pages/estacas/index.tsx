import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Botao from "../../components/botao";
import Loader from "../../components/loader";
import api from "../../services/Instance";
import './estacas.scss'
import HandleInputkey from '../../services/Regexs/HandleInputkey';
import Layout from "../../components/layout";
const EstacaS = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [endereço, setEndereço] = useState('');
    const { id } = useParams();
    const [paraEstacas, SetParamet] = useState('');
    const [estaCarregando, setestaCarregando] = useState<boolean>(false);
    const data = {
        nome: nome,
        endereço: endereço
    }

    useEffect(() => {
        if (id) {
            setestaCarregando(true);
            api.get(`/estacas/${id}`)
                .then((resposta: { data: any; }) => {
                    SetParamet(resposta.data);
                    setNome(resposta.data.nome);
                    setEndereço(resposta.data.endereço);
                    setestaCarregando(false);


                })
        }
    }, []);

    const FormEstacas = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); 
        setestaCarregando(true)
        if (id) {

           api.patch(`/estacas/${id}`, data)
                .then((response: { data: any; }) => {
                    if (response.data) {
                        setestaCarregando(false)
                        alert('Atualizou com sucesso!');
                        console.log(response.data);
                        navigate("/adm/estacas")
                    }
                })
                .catch(function (error) {
                    setestaCarregando(false)
                    console.log(error)
                });

        }else{
            
            api.post(`/estacas`, data)
                .then((response: { data: any; }) => {
    
                    if (response.data) {
                        setestaCarregando(false)
                        alert('cadastrado com sucesso')
                        setNome('');
                        setEndereço('');
                    }
                })
                .catch(function (error) {
                    if (error) {
                        setestaCarregando(false)
                        alert(error.response.data.erro)
                        console.log(error.response.data.erro)
                    }
                });
        }
    }


    return (
        <Layout title="Cadastrar Estacas">
        <div className="body">
            {estaCarregando ? <Loader/> :
            <main id="estacas">
                <h1 className="estacas">Estacas</h1>
                <div className="container">
                    <form className="Form" onSubmit={FormEstacas}>
                        <TextField
                            type={"text"}
                            value={nome}
                            onChange={evento => setNome(evento.target.value)}
                            onKeyPress={HandleInputkey}
                            label="Nome da Ala"
                            variant="standard"
                            fullWidth
                            required />
                        <TextField
                            type={"text"}
                            value={endereço}
                            onChange={evento => setEndereço(evento.target.value)}
                            label="Endereço"
                            variant="standard"
                            fullWidth
                            required />
                        <Botao type="submit">
                            {paraEstacas? 'Atualizar': 'Cadastra'}
                        </Botao>
                    </form>
                </div>
            </main>
            }
        </div>
        </Layout>
    );

}

export default EstacaS