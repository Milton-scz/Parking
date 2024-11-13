import { gql } from 'apollo-angular';


const listaTarifas = gql`
  query getTarifas($page: Int!, $size: Int!) {
    getTarifas(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        tarifaId
        tipoVehiculo
        precio_hora
        precio_dia
        precio_lavado
      }
    }
  }
`;
const getAllTarifas= gql `
query {
  getAllTarifas {
    tarifaId
    tipoVehiculo
    precio_hora
    precio_dia
    precio_lavado
    }
}
`;

export { listaTarifas, getAllTarifas};
