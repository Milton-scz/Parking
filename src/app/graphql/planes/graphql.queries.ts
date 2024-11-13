import { gql } from 'apollo-angular';


const listaPlanes = gql`
  query getPlanes($page: Int!, $size: Int!) {
    getPlanes(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        planId
        abonado{
        nombre
        cedula
        placa
        }
        montoSemanaMes
        duracion
        tipo
        fechaInicio
        montoTotal
        detalle{
        detalleId
        fechaPago
        monto
        }
      }
    }
  }
`;


export { listaPlanes};
