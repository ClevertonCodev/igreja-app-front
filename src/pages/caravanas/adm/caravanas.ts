import Estacas from "../../users/adm/estacas";

  export default interface Caravana  {
    [x: string]: any;
    id:number
    Nome: string,
    Destino: string,
    Quantidade_passageiros: number,
    DataHora_partida: string,
    DataHora_retorno: string,
    Status: string,
    estacas_id: Estacas[]
  }