import { Identifier } from "./Identifier";

interface InternalReference {
  reference?: string;
}

interface ExternalReference {
  identifier?: Identifier;
  display: string;
}

/**
 * https://hl7.org/fhir/R5/references.html
 */
export type Reference<_> = InternalReference | ExternalReference;

export const isInternalReference = (r: Reference<any>) => {
  return !!(r as InternalReference).reference;
};
