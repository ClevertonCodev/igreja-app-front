import Alas from "./alas";

export default interface Parametros {
    [x: string]: any;
    id?: number;
    name?: string;
    password?: string;
    email?: string;
    active?: boolean;
    type?: string;
    rg?: string;
    cpf?: string;
    telefone?: string;
    endereço?: string;
    alas_id?: Alas[];
   
  }