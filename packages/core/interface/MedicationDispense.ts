import { Medication } from "./Medication";
import { OrderMedicationRequest } from "./OrderMedicationRequest";
import { Patient } from "./Patient";
import { DosageInstruction } from "./fhir/DosageInstruction";
import { Organization } from "./fhir/Organization";
import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

export interface MedicationDispense extends Resource {
  status: "completed";
  medication: Medication;
  subject: Reference<Patient>;
  performer: Reference<Organization>; // Pharmacy
  authorizingPrescription: Reference<OrderMedicationRequest>;
  type: {
    coding: {
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode";
      code: "FFC" | "FFP";
    }[];
  };
  dosageInstruction: DosageInstruction[];
}
