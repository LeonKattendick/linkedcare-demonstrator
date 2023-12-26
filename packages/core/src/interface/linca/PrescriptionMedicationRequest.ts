import { BaseMedicationRequest } from "./BaseMedicationRequest";
import { ProposalMedicationRequest } from "./ProposalMedicationRequest";
import { Identifier } from "./fhir/Identifier";
import { Reference } from "./fhir/Reference";

/**
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-prescription-medication-request.html
 */
export interface PrescriptionMedicationRequest extends BaseMedicationRequest {
  intent: "order";
  status: "active" | "ended" | "stopped" | "entered-in-error";
  priorPrescription?: Reference<ProposalMedicationRequest>; // Used for modification
  groupIdentifier: Identifier; // eRezeptID
}
