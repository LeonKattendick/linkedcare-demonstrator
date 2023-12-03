import { BaseMedicationRequest } from "./BaseMedicationRequest";
import { OrderMedicationRequest } from "./OrderMedicationRequest";
import { Identifier } from "./fhir/Identifier";
import { Reference } from "./fhir/Reference";

export const PRESCRIPTION_PROFILE_LINK =
  "http://fhir.hl7.at/linkedcare/StructureDefinition/linca-prescription-medication-request";

/**
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-prescription-medication-request.html
 */
export interface PrescriptionMedicationRequest extends BaseMedicationRequest {
  status: "active" | "ended" | "stopped" | "entered-in-error";
  priorPrescription?: Reference<OrderMedicationRequest>; // Used for modification
  groupIdentifier: Identifier; // eRezeptID
}
