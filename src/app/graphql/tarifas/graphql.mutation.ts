import { gql } from 'apollo-angular';

const createTarifa = gql`
  mutation createTarifa($tarifa: NewTarifa!) {
    createTarifa(tarifa: $tarifa) {
      tarifaId
      tipoVehiculo
      precio_hora
      precio_dia
      precio_lavado
    }
  }
`;


const deleteTarifa = gql`
  mutation deleteTarifa($tarifaId: ID!) {
    deleteTarifa(tarifaId: $tarifaId)
  }
`;

export { createTarifa, deleteTarifa };
