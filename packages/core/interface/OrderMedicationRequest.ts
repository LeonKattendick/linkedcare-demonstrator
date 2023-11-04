import { Medication } from "./Medication";
import { Patient } from "./Patient";
import { RequestOrchestration } from "./RequestOrchestration";
import { Dosage } from "./fhir/Dosage";
import { Organization } from "./fhir/Organization";
import { Practitioner } from "./fhir/Practitioner";
import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

/**
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-order-medication-request.html
 */
export interface OrderMedicationRequest extends Resource {
  intent: "order";
  status: "active" | "cancelled" | "unknown";
  basedOn?: Reference<OrderMedicationRequest>; // Update
  subject: Reference<Patient>;
  medication: Medication;
  informationSource: Reference<Organization>;
  supportingInformation: Reference<RequestOrchestration>; // HOW?
  requester: Reference<Practitioner>; // Requesting Caregiver
  performer: Reference<Practitioner>; // Related Doctor
  dispenseRequest: {
    dispenser: Reference<Organization>; // Pharmacy
  };
  dosageInstruction: Dosage[];
}
