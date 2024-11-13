export class Vehiculo{
  vehiculoId!: number;
  placa: string;
  estado: Status;



  constructor(vehiculoId: number, placa: string, estado: Status) {
    this.vehiculoId = vehiculoId;
    this.placa = placa;
    this.estado = estado;

  }

}
export enum Status {
  ADENTRO = 'ADENTRO',
  AFUERA = 'AFUERA'
}
