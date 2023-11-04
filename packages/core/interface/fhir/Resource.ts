export interface Resource {
  resourceType?: "Patient" | "RequestOrchestration" | "MedicationRequest";
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
