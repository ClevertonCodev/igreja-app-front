import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Botao from "../../components/botao";
import Header from "../../components/header";
import Token from "../../components/token";

const EstacaS = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [endereço, setEndereço] = useState('');
    const { id } = useParams();
    const [paraEstacas, SetParamet] = useState('');
    const data = {
        nome: nome,
        endereço: endereço
    }

    useEffect(() => {
        if (id) {


            axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/v1/estacas/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': Token()
                }

            })

                .then((resposta: { data: any; }) => {
                    SetParamet(resposta.data)
                    setNome(resposta.data.nome)
                    setEndereço(resposta.data.endereço)


                })
        }
    }, [id]);

    const FormEstacas = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); 
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
                        alert('Atualizou com sucesso!');
                        navigate("/adm/estacas")
                    }
                })

                .catch(function (error) {
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
                        alert('cadastrado com sucesso')
                        navigate("/home")
    
                    }
                })
                .catch(function (error) {
                    if (error) {
                        alert(error.response.data.erro)
                        console.log(error.response.data.erro)
                    }
                });

        }


    }


    return (
        <div>
            <Header />
            <div className="container">

                <h1>estacas</h1>
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
        </div>
    );

}

export default EstacaS