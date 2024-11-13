import { gql } from 'apollo-angular';


const listaRegistros = gql`
  query getRegistros($page: Int!, $size: Int!) {
    getRegistros(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        registroId
        placa
        tipoVehiculo{
        tarifaId
        tipoVehiculo
        precio_hora
        precio_dia
        precio_lavado
        }
        hora
        fecha
        plaza{
        plazaId
        estado
        numero
        largo
        ancho
        }
        tipo
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

const getAllRegistros= gql `
query {
  getAllRegistros {
    registroId
    placa
    tipoVehiculo{
    tarifaId
    tipoVehiculo
    precio_hora
    precio_dia
    precio_lavado
    }
    hora
    fecha
    tipo
    plaza{
    plazaId
    numero
    largo
    ancho
    estado
    }
    }
}
`;

const getRegistroByPlaca = gql`
  query getRegistroByPlaca($placa: String!) {
    getRegistroByPlaca(placa: $placa)
  }
`;

export { listaRegistros, getAllAbonados,getRegistroByPlaca,getAllRegistros};
