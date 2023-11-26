/**
 * https://hl7.org/fhir/R5/resource.html
 * and
 * https://hl7.org/fhir/R5/domainresource.html
 */
export interface Resource {
  resourceType?: "Patient" | "RequestOrchestration" | "MedicationRequest" | "MedicationDispense";
  id?: string; // assigned by FHIR server
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile: string[]; // contains link to structure definition
  };
  text?: {
    status: "generated";
    div: string; // HTML
  };
}
