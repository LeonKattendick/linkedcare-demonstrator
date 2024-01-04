import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";
import { MedicationDispense } from "../interface/linca/MedicationDispense";
import { RequestOrchestration } from "../interface/linca/RequestOrchestration";
import { isAuthorizingPrescription } from "./matchingUtil";

// "BOTH" describes the state were prescriptions are needed but the pharmacy can already dispense at least one medication
export enum OrderState {
  CAREGIVER = "CAREGIVER",
  DOCTOR = "DOCTOR",
  BOTH = "BOTH",
  PHARMACY = "PHARMACY",
  WAIT_FOR_COMPLETED = "WAIT_FOR_COMPLETED",
  COMPLETED = "COMPLETED",
  REVOKED = "REVOKED",
}

export const calculateOrderState = (
  requests: BaseMedicationRequest[],
  dispenses: MedicationDispense[],
  order: RequestOrchestration | null
) => {
  if (order?.status === "completed") return OrderState.COMPLETED;
  if (requests.length === 0) return OrderState.CAREGIVER;

  const isRevoked = order?.status === "revoked" || requests.every((v) => v.status === "cancelled");
  const activeProposals = requests.filter((v) => v.intent === "proposal" && v.status === "active");
  const activeOrders = requests.filter(
    (v) => v.intent === "order" && v.status === "active" && !dispenses.find((w) => isAuthorizingPrescription(w, v))
  );

  if (isRevoked) return OrderState.REVOKED;
  if (activeOrders.length > 0 && activeProposals.length > 0) return OrderState.BOTH;
  if (activeProposals.length > 0) return OrderState.DOCTOR;
  if (activeOrders.length > 0) return OrderState.PHARMACY;

  return OrderState.WAIT_FOR_COMPLETED;
};
