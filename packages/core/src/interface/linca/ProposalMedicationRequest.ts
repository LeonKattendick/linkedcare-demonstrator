import { BaseMedicationRequest } from "./BaseMedicationRequest";
import { Practitioner } from "./fhir/Practitioner";
import { Reference } from "./fhir/Reference";

/**
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-order-medication-request.html
 */
export interface ProposalMedicationRequest extends Omit<BaseMedicationRequest, "performer"> {
  status: "active" | "cancelled" | "unknown";
  performer?: Reference<Practitioner>; // TODO: Is this really optional?
}
