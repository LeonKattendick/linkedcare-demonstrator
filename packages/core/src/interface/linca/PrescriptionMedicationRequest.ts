import { BaseMedicationRequest } from "./BaseMedicationRequest";
import { ProposalMedicationRequest } from "./ProposalMedicationRequest";
import { Identifier } from "./fhir/Identifier";
import { Reference } from "./fhir/Reference";

export const E_MED_ID_SYSTEM = "urn:oid:1.2.40.0.10.1.4.3.4.2.1";
export const E_REZEPT_ID_SYSTEM = "urn:oid:1.2.40.0.10.1.4.3.3";

/**
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-prescription-medication-request.html
 */
export interface PrescriptionMedicationRequest extends BaseMedicationRequest {
  intent: "order";
  status: "active" | "ended" | "stopped" | "entered-in-error";
  priorPrescription?: Reference<ProposalMedicationRequest>; // Used for modification
  identifier?: Identifier[]; // eMedID
  groupIdentifier?: Identifier; // eRezeptID
}
