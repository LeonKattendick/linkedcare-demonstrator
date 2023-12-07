import { InternalReference, Reference } from "../interface/linca/fhir/Reference";

export const isInternalReference = (r: Reference<any>) => {
  return !!(r as InternalReference).reference;
};
