import { Abonado } from "./abonado";
import { DetallePlan } from "./detallePlan";

export class Plan{
  planId!: number;
  abonado: Abonado;
  montoSemanaMes: number;
  duracion: number;
  tipo: Tipo;
  fechaInicio: string;
  montoTotal: number;
  detalle: DetallePlan[];


  constructor(planId: number, abonado: Abonado, montoSemanames: number, duracion: number, tipo:Tipo , fechaInicio: string, montoTotal:number, detalle: DetallePlan[] = []) {
    this.planId = planId;
    this.abonado = abonado;
    this.montoSemanaMes = montoSemanames;
    this.duracion = duracion;
    this.tipo = tipo;
    this.fechaInicio = fechaInicio;
    this.montoTotal = montoTotal;
    this.detalle = detalle
  }

}
export enum Tipo {
  SEMANAL = 'SEMANAL',
  MENSUAL = 'MENSUAL'
}


