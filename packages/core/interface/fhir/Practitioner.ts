import { Address } from "./Address";
import { ContactPoint } from "./ContactPoint";
import { HumanName } from "./HumanName";
import { Identifier } from "./Identifier";
import { Resource } from "./Resource";

/**
 * https://hl7.org/fhir/R5/practitioner.html
 */
export interface Practitioner extends Resource {
  identifier: Identifier[];
  name: HumanName[];
  active: boolean;
  telecom: ContactPoint[];
  address: Address[];
}
