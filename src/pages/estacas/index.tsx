import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Botao from "../../components/botao";
import Header from "../../components/header";
import Loader from "../../components/loader";
import Navbar from "../../components/navbar";
import Token from "../../components/token/Token";
import './estacas.scss'
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

            axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/v1/estacas/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': Token()
                }

            })

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
            axios({
                method: 'patch',
                url: `http://127.0.0.1:8000/api/v1/estacas/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': Token()
                },
                data:data
            })
                .then((response: { data: any; }) => {
                    if (response.data) {
                        setestaCarregando(false)
                        alert('Atualizou com sucesso!');
                        navigate("/adm/estacas")
                    }
                })

                .catch(function (error) {
                    setestaCarregando(false)
                    console.log(error)
                });

        }else{
            
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/estacas',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': Token()
                },
                data:data
            })
    
    
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
        <div className="body">
            <Navbar/>
            {estaCarregando ? <Loader/> :
            <main id="estacas">
                <h1 className="estacas">Estacas</h1>
                <div className="container">
                    <form className="Form" onSubmit={FormEstacas}>
                        <TextField
                            type={"text"}
                            value={nome}
                            onChange={evento => setNome(evento.target.value)}
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
    );

}

export default EstacaS