import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";

// "BOTH" describes the state were prescriptions are needed but the pharmacy can already dispense at least one medication
export enum OrderState {
  CAREGIVER = "CAREGIVER",
  DOCTOR = "DOCTOR",
  BOTH = "BOTH",
  PHARMACY = "PHARMACY",
  COMPLETED = "COMPLETED",
}

export const calculateOrderState = (r: BaseMedicationRequest[]) => {
  if (r.length === 0) return OrderState.CAREGIVER;

  const activeProposals = r.filter((v) => v.intent === "proposal" && v.status === "active");
  const activeOrders = r.filter((v) => v.intent === "order" && v.status === "active");

  if (activeOrders.length > 0 && activeProposals.length > 0) return OrderState.BOTH;
  if (activeProposals.length > 0) return OrderState.DOCTOR;
  if (activeOrders.length > 0) return OrderState.PHARMACY;

  return OrderState.COMPLETED;
};
