/**
 * https://hl7.org/fhir/R5/resource.html
 * and
 * https://hl7.org/fhir/R5/domainresource.html
 */
export interface Resource {
  resourceType?:
    | "Organization"
    | "Patient"
    | "Practitioner"
    | "RequestOrchestration"
    | "MedicationRequest"
    | "MedicationDispense"
    | "Bundle";
  id?: string; // assigned by FHIR server
  meta?: {
    versionId?: string;
    lastUpdated?: string;
  };
}
