import { gql } from 'apollo-angular';

const createSmartContract = gql`
  mutation createSmartContract($contract: NewSmartContract!) {
    createSmartContract(contract: $contract) {
      smartId
      trxHash
    }
  }
`;


export { createSmartContract };
