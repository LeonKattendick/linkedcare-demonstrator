import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";
import { RequestOrchestration } from "../interface/linca/RequestOrchestration";

// "BOTH" describes the state were prescriptions are needed but the pharmacy can already dispense at least one medication
export enum OrderState {
  CAREGIVER = "CAREGIVER",
  DOCTOR = "DOCTOR",
  BOTH = "BOTH",
  PHARMACY = "PHARMACY",
  COMPLETED = "COMPLETED",
  REVOKED = "REVOKED",
}

export const calculateOrderState = (r: BaseMedicationRequest[], order: RequestOrchestration | null) => {
  if (r.length === 0) return OrderState.CAREGIVER;

  const isRevoked = order?.status === "revoked" || r.every((v) => v.status === "cancelled");
  const activeProposals = r.filter((v) => v.intent === "proposal" && v.status === "active");
  const activeOrders = r.filter((v) => v.intent === "order" && v.status === "active");

  if (isRevoked) return OrderState.REVOKED;
  if (activeOrders.length > 0 && activeProposals.length > 0) return OrderState.BOTH;
  if (activeProposals.length > 0) return OrderState.DOCTOR;
  if (activeOrders.length > 0) return OrderState.PHARMACY;

  return OrderState.COMPLETED;
};
