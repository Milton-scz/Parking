export class DetallePlan {
  detalleId: number;
  fechaPago: string;
  monto: number;

  constructor(detalleId: number, fechaPago: string, monto: number) {
    this.detalleId = detalleId;
    this.fechaPago = fechaPago;
    this.monto = monto;
  }
}
