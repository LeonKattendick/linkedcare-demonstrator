import { Identifier } from "../interface/linca/fhir/Identifier";
import { Organization } from "../interface/linca/fhir/Organization";
import { ExternalReference, InternalReference, Reference } from "../interface/linca/fhir/Reference";
import { isInternalReference } from "./referenceUtil";

export const identifiersEqual = (i1: Identifier | undefined, i2: Identifier | undefined) => {
  if (!i1 || !i2) return false;
  return i1.system === i2.system && i1.value === i2.value;
};

export const referencesEqual = (r1: Reference<any>, r2: Reference<any>) => {
  if (!r1 || !r2) return false;

  if (isInternalReference(r1) && isInternalReference(r2)) {
    return (r1 as InternalReference).reference === (r2 as InternalReference).reference;
  } else if (!isInternalReference(r1) && !isInternalReference(r2)) {
    return identifiersEqual((r1 as ExternalReference).identifier, (r2 as ExternalReference).identifier);
  } else {
    throw new Error(`Can't compare ${r1} and ${r2}!`);
  }
};

export const caregiverIsFromOrganization = (caregiver: Organization | null, organization: Reference<Organization>) => {
  if (!caregiver || !organization || !caregiver.partOf) return false;
  return referencesEqual(caregiver.partOf, organization);
};
