import { BaseMedicationRequest } from "./BaseMedicationRequest";

/**
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-order-medication-request.html
 */
export interface ProposalMedicationRequest extends BaseMedicationRequest {
  intent: "proposal";
  status: "active" | "cancelled" | "unknown";
}
