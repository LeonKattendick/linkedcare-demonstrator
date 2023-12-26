import { BaseMedicationRequest } from "./BaseMedicationRequest";
import { Organization } from "./fhir/Organization";
import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

/**
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-full-proposal-list.html
 */
export interface RequestOrchestration extends Resource {
  resourceType: "RequestOrchestration";
  status: "active" | "revoked" | "completed";
  intent: "proposal";
  subject: Reference<Organization>;
  contained: BaseMedicationRequest[];
}
