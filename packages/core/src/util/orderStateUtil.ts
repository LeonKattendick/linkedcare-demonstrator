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
  return OrderState.CAREGIVER;
};
