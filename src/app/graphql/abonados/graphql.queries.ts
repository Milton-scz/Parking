import { gql } from 'apollo-angular';


const listaAbonados = gql`
  query getAbonados($page: Int!, $size: Int!) {
    getAbonados(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        abonadoId
        nombre
        placa
        cedula
        direccion
        celular
      }
    }
  }
`;
const getAllAbonados= gql `
query {
  getAllAbonados {
    abonadoId
    nombre
    cedula
    placa
    celular
    }
}
`;

export { listaAbonados, getAllAbonados};
