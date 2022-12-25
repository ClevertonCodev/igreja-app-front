import Estacas from './estacas';
export default interface Alas {
    id: number
    name:string
    endereço: string
    estacas_id: Estacas[]
  }