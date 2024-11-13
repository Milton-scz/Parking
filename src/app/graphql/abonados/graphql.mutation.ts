import { gql } from 'apollo-angular';

const createAbonado = gql`
  mutation createAbonado($abonado: NewAbonado!) {
    createAbonado(abonado: $abonado) {
      abonadoId
      nombre
      cedula
      placa
      direccion
     celular
    }
  }
`;

const deleteAbonado = gql`
  mutation deleteAbnado($abonadoId: ID!) {
    deleteAbonado(abonadoId: $abonadoId)
  }
`;

export { createAbonado, deleteAbonado };
