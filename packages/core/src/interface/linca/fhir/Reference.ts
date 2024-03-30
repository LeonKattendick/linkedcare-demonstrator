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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Reference<_> = InternalReference | ExternalReference;
