import { gql } from 'apollo-angular';


const listaVehiculos = gql`
  query getVehiculos($page: Int!, $size: Int!) {
    getVehiculos(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        vehiculoId
        placa
        estado
      }
    }
  }
`;
const getAllVehiculos= gql `
query {
  getAllVehiculos {
    vehiculoId
    placa
    estado
    }
}
`;

export { listaVehiculos,getAllVehiculos};
