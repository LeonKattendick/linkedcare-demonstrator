import { Identifier } from "./Identifier";

export interface InternalReference {
  reference?: string;
}

export interface ExternalReference {
  identifier?: Identifier;
  display: string;
}

/**
 * https://hl7.org/fhir/R5/references.html
 */
export type Reference<_> = InternalReference | ExternalReference;
