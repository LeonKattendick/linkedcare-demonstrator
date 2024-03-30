import { InternalReference, Reference } from "../interface/linca/fhir/Reference";

export const isInternalReference = (r: Reference<unknown>) => {
  return !!(r as InternalReference).reference;
};
