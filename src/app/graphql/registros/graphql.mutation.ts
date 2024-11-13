import { gql } from 'apollo-angular';

const createRegistro = gql`
  mutation createRegistro($registro: NewRegistro!) {
    createRegistro(registro: $registro) {
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
     }
    }
  }
`;


const deleteRegistro = gql`
  mutation deleteRegistro($registroId: ID!) {
    deleteRegistro(registroId: $registroId)
  }
`;

export { createRegistro, deleteRegistro };
