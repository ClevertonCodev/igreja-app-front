import { FormControl, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { error } from "console";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Botao from "../../components/botao";
import "./users.scss"

interface AutocompleteOption {
    label: string;
}


const Users = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [active, setActive] = useState('');
    const [type, setType] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereço, setEndereço] = useState('');
    const [alas_id, setAlas] = useState('');


    const navigate = useNavigate();
    
        function token(){

           let token:any = document.cookie.split(';').find(indice => {
               return indice.includes('token=')
           })
          
           token = token.split('=')[1]
          
           token = 'Bearer ' + token
           return token
       }

       console.log(token())

    

    const FormUser = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
       
        axios({
            
            method: 'post',
            url: 'http://127.0.0.1:8000/api/v1/users',
            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token()
            }
            ,
            data: {
                name: name,
                password: password,
                email: email,
                active: active,
                type: type,
                rg: rg,
                cpf: cpf,
                telefone: telefone,
                endereço: endereço,
                alas_id: alas_id
            }

        })
            .then((response: { data: any }) => {
                if (response.data) {
                    console.log(response.data);
                }
            })

            .catch(function (error) {
                if (error.response.data.errors.cpf) {
                    alert(error.response.data.errors.cpf)
                }
                if (error.response.data.errors.email){
                    alert(error.response.data.errors.email)
                }
                if(error.response.data.erro){
                    alert(error.response.data.erro)
                }
            });
    
    }
    return (
        <div className="containeer">
            <form onSubmit={FormUser}>
              
                <TextField
                    type={"text"}
                    value={name}
                    onChange={evento => setName(evento.target.value)}
                    label="nome"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"password"}
                    value={password}
                    onChange={evento => setPassword(evento.target.value)}
                    label="senha"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"email"}
                    value={email}
                    onChange={evento => setEmail(evento.target.value)}
                    label="email"
                    variant="outlined"
                    fullWidth
                    required
                />

                <FormControl fullWidth>
                    <InputLabel required id="demo-simple-select-label">O membro é ativo?</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={active}
                        label="active"
                        required
                        onChange={evento => setActive(evento.target.value)}
                    >
                        <MenuItem value={1}>Sim</MenuItem>
                        <MenuItem value={0}>Não</MenuItem>
                    </Select>
                </FormControl>


                <FormControl fullWidth>
                    <InputLabel required id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        required
                        onChange={evento => setType(evento.target.value)}
                    >
                        <MenuItem value='super'>Super</MenuItem>
                        <MenuItem value='secretarios'>Secretário</MenuItem>
                        <MenuItem value='comum'>Comum</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    type={"text"}
                    value={rg}
                    onChange={evento => setRg(evento.target.value)}
                    label="RG"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"text"}
                    value={cpf}
                    onChange={evento => setCpf(evento.target.value)}
                    label="CPF"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"text"}
                    value={telefone}
                    onChange={evento => setTelefone(evento.target.value)}
                    label="Telefone"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"text"}
                    value={endereço}
                    onChange={evento => setEndereço(evento.target.value)}
                    label="Endereço"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    type={"text"}
                    value={alas_id}
                    onChange={evento => setAlas(evento.target.value)}
                    label="Alas_id"
                    variant="outlined"
                    fullWidth
                />
                <Botao type='submit'>
                    Enviar
                </Botao>
            </form>
        </div>
    );

}

export default Users;