import { gql } from 'apollo-angular';

const createPlaza = gql`
  mutation createPlaza($plaza: NewPlaza!) {
    createPlaza(plaza: $plaza) {
      plazaId
      numero
      largo
      ancho
      estado
    }
  }
`;


const deletePlaza = gql`
  mutation deletePlaza($plazaId: ID!) {
    deletePlaza(plazaId: $plazaId)
  }
`;

export { createPlaza, deletePlaza };
