import Tipoveiculos from '../tipoveiculos/tipoveiculos';
 export default interface Iveiculos {
   [x: string]: any;
    id: number; 
    tipo_veiculos_id: Tipoveiculos[];
    name: string;
    quantidade_lugares: number;
    veiculos: Iveiculos[];
 }