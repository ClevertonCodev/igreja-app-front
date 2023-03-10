import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import Token from "../../../components/token/Token";
import "../../users/users.scss";
import Iveiculos from "../../veiculos/veiculos";
import Caravana from "./caravanas";
import "../tableModal.scss";
import Loader from "../../../components/loader";

const AdmCaravanas = () => {
  const navigate = useNavigate();
  const [caravanas, setCaravanas] = useState<Caravana[]>([]);
  const [veiculos, setVeiculos] = useState<Iveiculos[]>([]);
  const [veiculo, setVeiculo] = useState<Iveiculos[]>([]);
  const caravanasVeiculo: Array<number> = [];
  const [VeiculosLivres, setVeiculosLivres] = useState<Iveiculos[]>([]);
  const [Idcaravana, SetIdcaravana] = useState<number>();
  const [veiculosSelecionado, setSelecionado] = useState<number[]>([]);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const [estaCarregando, setestaCarregando] = useState<boolean>(true);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/caravanas",
      headers: {
        Accept: "application/json",
        Authorization: Token(),
      },
    }).then((resposta: { data: Caravana[] }) => {
      setCaravanas(resposta.data);
      setestaCarregando(false);
    });

    axios
      .get("http://127.0.0.1:8000/api/v1/veiculos", {
        headers: {
          Accept: "application/json",
          Authorization: Token(),
        },
      })
      .then((resposta: { data: Iveiculos[] }) => {
        setVeiculos(resposta.data);
      });
  }, [veiculo]);

  const excluir = (caravanaExcluir: Caravana) => {
    setestaCarregando(true);
    axios({
      method: "delete",
      url: `http://127.0.0.1:8000/api/v1/caravanas/${caravanaExcluir.id}`,
      headers: {
        Accept: "application/json",
        Authorization: Token(),
      },
    }).then((excluir: { data: any }) => {
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

  const IDcaravanas = (idcaravana: Caravana) => {
    SetIdcaravana(idcaravana.id);

    caravanas.forEach((caravana) => {
      caravana.veiculos.forEach((veiculosUsados) => {
        caravanasVeiculo.push(veiculosUsados.id);
      });
    });
    setVeiculosLivres(
      veiculos.filter(
        (veiculoEmUso) => !caravanasVeiculo.includes(veiculoEmUso.id)
      )
    );
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/v1/caravanasveiculos/${idcaravana.id}`,
      headers: {
        Accept: "application/json",
        Authorization: Token(),
      },
    }).then((resposta: { data: Iveiculos[] }) => {
      setVeiculo(resposta.data);
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
  function handleClear() {
    setSelecionado([]);
  }

  const NewVeiculos = () => {
    botaoRef.current?.click();
    navigate("/veiculos");
  };

  const Veiculos_Caravanas = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const sendVehicle = veiculosSelecionado.toString();
    console.log(sendVehicle);
    if (sendVehicle) {
      let resposta = window.confirm(
        "Voc?? gostaria de casdastrar esse(s) veiculo(s)?"
      );

      if (resposta) {
        const data = {
          veiculo: sendVehicle,
        };

        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/v1/adicionarveiculos/${Idcaravana}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: Token(),
          },

          data: data,
        })
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
    }
  };
  return (
    <div>
      <Navbar />,
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
                        onClick={() => IDcaravanas(resposta)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
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
          <div
            className="modal fade bd-example-modal-lg"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="container_titulo">
                    <h1
                      className="modal-title fs-5"
                      id="exampleModalToggleLabel2"
                    >
                      Veiculos cadastrados
                    </h1>
                  </div>
                  <button
                    className="close-button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleClear}
                  ></button>
                </div>
                <div className="modal-body">
                  {JSON.stringify(veiculo) === "[]" ? (
                    <div
                      className="alert alert-danger"
                      role="alert"
                      id="alertred"
                    >
                      Essa caravana n??o tem nenhum veiculo cadastrado!
                    </div>
                  ) : (
                    <table className="table" id="tableModal">
                      <thead className="thead">
                        <tr>
                          <th scope="col">Nome</th>
                          <th scope="col">Tipo Veiculo</th>
                          <th scope="col">Quantidade de passageiros</th>
                        </tr>
                      </thead>
                      <tbody>
                        {veiculo.map((resposta) => (
                          <tr className="tr" key={resposta.id}>
                            <td>{resposta.tipo_veiculos["tipo"]}</td>
                            <td>{resposta.name}</td>
                            <td>{resposta.quantidade_lugares}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="modal-footer">
                  <Button
                    variant="outlined"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                  >
                    {JSON.stringify(veiculo) === "[]"
                      ? "Adicionar Veiculos"
                      : "Adicionar um novo veiculo"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModalToggle2"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="container_titulo">
                    <h1
                      className="modal-title fs-5"
                      id="exampleModalToggleLabel2"
                    >
                      Veiculos dispon??veis
                    </h1>
                  </div>
                  <button
                    ref={botaoRef}
                    className="close-button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleClear}
                  ></button>
                </div>
                <div className="modal-body">
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
                </div>
                <div className="modal-footer">
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
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
export default AdmCaravanas;
