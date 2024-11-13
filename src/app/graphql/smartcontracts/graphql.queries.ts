import { gql } from 'apollo-angular';


const getContracts = gql`
  query getContracts($page: Int!, $size: Int!) {
    getContracts(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        smartId
        trxHash
      }
    }
  }
`;



export { getContracts};
