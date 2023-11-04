import { Identifier } from "./Identifier";
import { Resource } from "./Resource";

/**
 * https://hl7.org/fhir/R5/organization.html
 */
export interface Organization extends Resource {
  identifier: Identifier[];
  display: string;
}
