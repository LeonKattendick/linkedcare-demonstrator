import { Identifier } from "../interface/linca/fhir/Identifier";
import { Organization } from "../interface/linca/fhir/Organization";
import { ExternalReference, InternalReference, Reference } from "../interface/linca/fhir/Reference";
import { isInternalReference } from "./referenceUtil";

export const identifiersEqual = (i1: Identifier | undefined, i2: Identifier | undefined) => {
  if (!i1 || !i2) return false;
  return i1.system === i2.system && i1.value === i2.value;
};

export const organizationEqualsReference = (o: Organization | null, r: Reference<Organization>) => {
  if (!o || !r) return false;

  if (isInternalReference(r)) return (r as InternalReference).reference === o.id;
  else return identifiersEqual((r as ExternalReference).identifier, o.identifier[0]);
};
