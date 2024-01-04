import { Medication } from "./Medication";
import { Patient } from "./Patient";
import { PrescriptionMedicationRequest } from "./PrescriptionMedicationRequest";
import { Dosage } from "./fhir/Dosage";
import { Organization } from "./fhir/Organization";
import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

/**
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-dipsense-documentation.html
 */
export interface MedicationDispense extends Resource {
  resourceType: "MedicationDispense";
  status: "completed";
  medication: Medication;
  subject: Reference<Patient>;
  performer: { actor: Reference<Organization> }[]; // Pharmacy
  authorizingPrescription: Reference<PrescriptionMedicationRequest>[];
  type: {
    coding: {
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode";
      code: "FFC" | "FFP";
    }[];
  };
  dosageInstruction: Dosage[];
}
