export class PageInfo{
 totalPaginas:number;
  totalElementos:number;
   paginaActual:number;
   pageSize:number;


  constructor(totalPaginas: number, totalElementos: number, paginaActual:number ,pageSize:number) {
    this.totalPaginas = totalPaginas;
    this.totalElementos = totalElementos;
    this.paginaActual = paginaActual;
    this.pageSize = pageSize;
}
}



