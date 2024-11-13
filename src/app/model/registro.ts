import { Plaza } from "./plaza";
import { Tarifa } from "./tarifa";

export class Registro{
  registroId!: number;
  placa: string;
  tipoVehiculo: Tarifa;
  hora: string;
  fecha: string;
  tipo: Tipo_Registro;
  plaza: Plaza;


  constructor(registroId: number, placa: string, tipoVehiculo: Tarifa, hora: string, fecha:string, tipo:Tipo_Registro,plaza: Plaza) {
    this.registroId = registroId;
    this.placa = placa;
    this.tipoVehiculo = tipoVehiculo;
    this.hora = hora;
    this.fecha = fecha;
    this.tipo = tipo;
    this.plaza = plaza;
  }

}
export enum Tipo_Registro {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA'
}
