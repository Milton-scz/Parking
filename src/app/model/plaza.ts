export class Plaza{
  plazaId!: number;
  numero: number;
  estado: Status;
  largo: number;
  ancho: number;


  constructor(plazaId: number, numero: number, estado: Status, largo: number, ancho:number) {
    this.plazaId = plazaId;
    this.numero = numero;
    this.estado = estado;
    this.largo = largo;
    this.ancho = ancho;
  }

}
export enum Status {
  OCUPADA = 'OCUPADA',
  DISPONIBLE = 'DISPONIBLE'
}
