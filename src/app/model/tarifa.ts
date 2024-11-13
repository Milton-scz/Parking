export class Tarifa {
  tarifaId!: number;
  tipoVehiculo: string = 'AUTO';
  precio_hora: number = 0;
  precio_dia: number = 0;
  precio_lavado: number = 0;

  constructor();
  constructor(tarifaId?: number, tipoVehiculo?: string, precio_hora?: number, precio_dia?: number, precio_lavado?: number) {
    if (tarifaId !== undefined) this.tarifaId = tarifaId;
    if (tipoVehiculo !== undefined) this.tipoVehiculo = tipoVehiculo;
    if (precio_hora !== undefined) this.precio_hora = precio_hora;
    if (precio_dia !== undefined) this.precio_dia = precio_dia;
    if (precio_lavado !== undefined) this.precio_lavado = precio_lavado;
  }
}
