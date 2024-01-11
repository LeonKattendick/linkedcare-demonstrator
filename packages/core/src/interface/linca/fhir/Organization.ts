import { Identifier } from "./Identifier";
import { Reference } from "./Reference";
import { Resource } from "./Resource";

/**
 * https://hl7.org/fhir/R5/organization.html
 */
export interface Organization extends Resource {
  resourceType: "Organization";
  identifier: Identifier[];
  name: string;
  type: "prov" | "other";
  partOf?: Reference<Organization>; // Caregiver - Careservice linking
}
