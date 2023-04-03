import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import "../../users/users.scss";
import Iveiculos from "../../veiculos/veiculos";
import Caravana from "./caravanas";
import "../tableModal.scss";
import Loader from "../../../components/loader";
import api from "../../../services/Instance";
import CustomModal from "../../../components/modal";
import DeleteAuto from "../../../services/DeleteAuto";
import Layout from "../../../components/layout";


const AdmCaravanas = () => {
  const navigate = useNavigate();
  const [caravanas, setCaravanas] = useState<Caravana[]>([]);
  const [veiculos, setVeiculos] = useState<Iveiculos[]>([]);
  const [veiculo, setVeiculo] = useState<Iveiculos[]>([]);
  const [VeiculosLivres, setVeiculosLivres] = useState<Iveiculos[]>([]);
  const [Idcaravana, SetIdcaravana] = useState<number>();
  const [veiculosSelecionado, setSelecionado] = useState<number[]>([]);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [estaCarregando, setestaCarregando] = useState<boolean>(true);
  const [modalcarregando, setestaModalcarregando] = useState<boolean>(true);

  useEffect(() => {
    api.get("/caravanas").then((resposta: { data: Caravana[] }) => {
      console.log(resposta.data);
      setCaravanas(resposta.data);
      setestaCarregando(false);
    });

    api.get("/veiculos").then((resposta: { data: Iveiculos[] }) => {
      setVeiculos(resposta.data);
    });
  }, [veiculo]);

  const excluir = (caravanaExcluir: Caravana) => {
    setestaCarregando(true);
    api.delete(`caravanas/${caravanaExcluir.id}`)
      .then((excluir: { data: any }) => {
        if (excluir.data.msg) {
          alert(excluir.data.msg);
          setestaCarregando(true);
          setVeiculo([]);
        }
      });
  };

  const editar = (editar: Caravana) => {
    if (editar.id) {
      navigate(`/adm/caravanas/${editar.id}`);
    }
  };


  const IDcaravanas = (idcaravana : number | undefined) => {
    SetIdcaravana(idcaravana);

      api.get(`/caravanasveiculos/${idcaravana}`)
      .then((resposta: { data: Iveiculos[] }) => {
        setVeiculo(resposta.data);
        setestaModalcarregando(false);
        setestaCarregando(false);
      });
    
    

    api.get(`/veiculoslivres/${idcaravana}`)
      .then((resposta: { data: Iveiculos[] }) => {
        console.log(resposta.data);
        setVeiculosLivres(resposta.data);
      });
  };

  function verificarselecionado(id: number) {
    const selecionaId = veiculosSelecionado.indexOf(id);
    if (selecionaId === -1) {
      setSelecionado([...veiculosSelecionado, id]);
    } else {
      setSelecionado(veiculosSelecionado.filter((item) => item !== id));
    }
  }
 
  const NewVeiculos = () => {
    botaoRef.current?.click();
    navigate("/veiculos");
  };

  const Veiculos_Caravanas = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const sendVehicle = veiculosSelecionado.toString();
    if (sendVehicle) {
      let resposta = window.confirm(
        "Você gostaria de casdastrar esse(s) veiculo(s)?"
      );

      if (resposta) {
        const data = {
          veiculo: sendVehicle,
        }

        api
          .post(`/adicionarveiculos/${Idcaravana}`, data)
          .then((resposta: { data: Iveiculos[] }) => {
            alert("cadastrou com sucesso");
            setVeiculo([]);
            setSelecionado([]);
            setCaravanas([]);
            setestaCarregando(true);
            botaoRef.current?.click();
          })
          .catch(function (error) {
            alert("Error");
            console.log(error);
          });
      } else {
        alert("tudo bem!");
        setSelecionado([]);
      }
    }else{
      alert("Click em algum veículo")
    }
  };
  return (
    <Layout title="Caravanas">
    <div>
      {estaCarregando ? (
        <Loader />
      ) : (
        <main>
          <div className="rolagem">
            <table className="table">
              <thead className="thead">
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Destino</th>
                  <th scope="col">Quantidade de passageiros</th>
                  <th scope="col">Data e Hora de partida</th>
                  <th scope="col">Data e Hora de rertono</th>
                  <th scope="col">Status</th>
                  <th scope="col">Estacas</th>
                  <th scope="col">Veiculos</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {caravanas.map((resposta) => (
                  <tr className="tr" key={resposta.id}>
                    <td>{resposta.Nome}</td>
                    <td> {resposta.Destino}</td>
                    <td> {resposta.Quantidade_passageiros}</td>
                    <td> {resposta.DataHora_partida}</td>
                    <td> {resposta.DataHora_retorno}</td>
                    <td> {resposta.Status}</td>
                    <td>{resposta.estacas["nome"]}</td>
                    <td>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          IDcaravanas(resposta.id);
                          setShowModal(true)
                          setestaModalcarregando(true);
                        }}
                        
                      >
                        Ver veiculos
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outlined"
                        onClick={() => editar(resposta)}
                       
                      >
                        Editar
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => excluir(resposta)}
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CustomModal 
          show ={
            showModal
          }
          onHide={
           () => setShowModal(false)
          }
          title={
            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
              Veiculos cadastrados
            </h1>
          }
          headerclose={
            <button
                    className="close-button"
                    onClick={()=>{setShowModal(false);
                                  setSelecionado([])}}
                  >
            </button>
          }
          content={
            <>
            {modalcarregando ? (
          <Loader />
            ) : (
          JSON.stringify(veiculo) === "[]" ? (
            <div className="alert alert-danger" role="alert" id="alertred">
              Essa caravana não tem nenhum veiculo cadastrado!
            </div>
          ) : (
            <table className="table" id="tableModal">
              <thead className="thead">
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Tipo Veiculo</th>
                  <th scope="col">Quantidade de passageiros</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {veiculo.map((resposta) => (
                  <tr className="tr" key={resposta.id}>
                    <td>{resposta.name}</td>
                    <td>{resposta.tipo_veiculos["tipo"]}</td>
                    <td>{resposta.quantidade_lugares}</td>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>  {DeleteAuto(resposta.id,          Idcaravana as number);
                           setestaModalcarregando(true);
                           IDcaravanas(Idcaravana)}}
                      >
                        Excluir
                      </Button>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
            </>
          }

         footerclose={
          <Button
            onClick={() => setShowModal2(true)}
        > 
          {JSON.stringify(veiculo) === "[]"
            ? "Adicionar Veiculos"
            : "Adicionar um novo veiculo"}
        </Button>
         }
          />

          <CustomModal 
          show ={
            showModal2
          }
          onHide={
              () => setShowModal(false)
          }
          title={
            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
              Veiculos disponíveis
            </h1>
          }
          headerclose={
            <button
                    ref={botaoRef}
                    className="close-button"
                    onClick={()=> {setShowModal2(false);
                                    setShowModal(false);
                                    setSelecionado([])}}
                  >
            </button>

          }
          content={
            <>
            <div className="conteiner_veiculos">
                    {JSON.stringify(VeiculosLivres) !== "[]" ? (
                      VeiculosLivres.map((resposta) => (
                        <ul
                          key={resposta.id}
                          className={
                            veiculosSelecionado.includes(resposta.id)
                              ? "selecionado"
                              : "list"
                          }
                          onClick={() => verificarselecionado(resposta.id)}
                        >
                          <li>
                            Tipo do Veiculo: {resposta.tipo_veiculos["tipo"]}
                          </li>
                          <li>Nome: {resposta.name}</li>
                          <li>Lugares: {resposta.quantidade_lugares}</li>
                        </ul>
                      ))
                    ) : (
                      <div
                        className="alert alert-danger"
                        role="alert"
                        id="alertred"
                      >
                        Desculpe! Nenhum veiculo disponivel no momento!
                      </div>
                    )}
                  </div>
            </>
          }
         footerclose={
          <>
          <Button
          variant="outlined"
          id="btn_veiculo"
          onClick={NewVeiculos}
        >
          Criar novo veiculo
        </Button>
        <Button
          variant="outlined"
          onClick={Veiculos_Caravanas}
          id="btn_veiculo"
        >
          Cadastrar veiculo(s)
        </Button>
        </>
         }
          />
        </main>
      )}
    </div>
    </Layout>
  );
};
export default AdmCaravanas;