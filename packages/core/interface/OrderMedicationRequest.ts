import { Medication } from "./Medication";
import { Patient } from "./Patient";
import { RequestOrchestration } from "./RequestOrchestration";
import { DosageInstruction } from "./fhir/DosageInstruction";
import { Organization } from "./fhir/Organization";
import { Practitioner } from "./fhir/Practitioner";
import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

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
  dosageInstruction: DosageInstruction[];
}
