import { Medication } from "./Medication";
import { OrderMedicationRequest } from "./OrderMedicationRequest";
import { Patient } from "./Patient";
import { RequestOrchestration } from "./RequestOrchestration";
import { DosageInstruction } from "./fhir/DosageInstruction";
import { Identifier } from "./fhir/Identifier";
import { Organization } from "./fhir/Organization";
import { Practitioner } from "./fhir/Practitioner";
import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

export interface PrescriptionMedicationRequest extends Resource {
  intent: "order";
  status: "active" | "ended" | "stopped" | "entered-in-error";
  basedOn?: Reference<OrderMedicationRequest>;
  priorPrescription?: Reference<OrderMedicationRequest>; // Used for modification
  groupIdentifier: Identifier; // eRezeptID
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
