import { Medication } from "./Medication";
import { Patient } from "./Patient";
import { PRESCRIPTION_PROFILE_LINK } from "./PrescriptionMedicationRequest";
import { RequestOrchestration } from "./RequestOrchestration";
import { Dosage } from "./fhir/Dosage";
import { Organization } from "./fhir/Organization";
import { Practitioner } from "./fhir/Practitioner";
import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

export interface BaseMedicationRequest extends Resource {
  intent: "order";
  status: "active" | "ended" | "stopped" | "entered-in-error" | "cancelled" | "unknown";
  basedOn?: Reference<BaseMedicationRequest>;
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

export const isPrescribed = (request: BaseMedicationRequest) => {
  return request.meta?.profile?.[0] === PRESCRIPTION_PROFILE_LINK;
};
