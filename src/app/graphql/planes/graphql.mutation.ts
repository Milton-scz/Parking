import { gql } from 'apollo-angular';

const createPlan = gql`
  mutation createPlan($plan: NewPlan!) {
    createPlan(plan: $plan) {
      planId
      abonado{
      abonadoId
      nombre
      placa
      }
      montoSemanaMes
      duracion
      fechaInicio
      montoTotal
    }
  }
`;


const deletePlan = gql`
  mutation deletePlan($planId: ID!) {
    deletePlan(planId: $planId)
  }
`;

export { createPlan, deletePlan };
