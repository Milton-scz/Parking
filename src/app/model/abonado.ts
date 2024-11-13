export class Abonado {
  abonadoId: number;
  nombre: string;
  cedula: string;
  placa: string;
  direccion: string;
  celular: string;


  constructor(
    abonadoId: number,
    nombre: string,
    cedula: string,
    placa: string,
    direccion: string,
    celular: string
  ) {

    this.abonadoId = abonadoId;
    this.nombre = nombre;
    this.cedula = cedula;
    this.placa = placa;
    this.direccion = direccion;
    this.celular = celular;
  }
}
