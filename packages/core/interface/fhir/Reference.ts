import { Identifier } from "./Identifier";

/**
 * https://hl7.org/fhir/R5/references.html
 */
export interface Reference<_> {
  reference?: string;
  identifier?: Identifier;
  display: string;
}
