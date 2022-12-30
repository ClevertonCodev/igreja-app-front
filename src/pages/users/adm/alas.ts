import Estacas from './estacas';
export default interface Alas {
    [x: string]: any;
    id: number
    name:string
    endereço: string
    estacas_id: Estacas[]
  }