import { gql } from 'apollo-angular';


const listaPlazas = gql`
  query getPlazas($page: Int!, $size: Int!) {
    getPlazas(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        plazaId
        numero
        largo
        ancho
        estado
      }
    }
  }
`;
const getAllPlazas= gql `
query {
  getAllPlazas {
    plazaId
    numero
    estado
    }
}
`;


export { listaPlazas,getAllPlazas};
