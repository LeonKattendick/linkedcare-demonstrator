import { DosageError } from "../interface/enum/DosageError";
import { MedicationRequestError } from "../interface/enum/MedicationRequestError";
import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";
import { PrescriptionMedicationRequest } from "../interface/linca/PrescriptionMedicationRequest";
import { Dosage } from "../interface/linca/fhir/Dosage";
import { Identifier } from "../interface/linca/fhir/Identifier";
import { Organization } from "../interface/linca/fhir/Organization";
import { ExternalReference, InternalReference, Reference } from "../interface/linca/fhir/Reference";
import { isPrescribed } from "./medicationRequestUtil";
import { isInternalReference } from "./referenceUtil";

export const identifiersEqual = (i1: Identifier | undefined, i2: Identifier | undefined) => {
  if (!i1 || !i2) return false;
  return i1.system === i2.system && i1.value === i2.value;
};

export const referencesEqual = (r1: Reference<any> | undefined, r2: Reference<any> | undefined) => {
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

export const identifierEqualsReference = (identifier: Identifier, reference: Reference<any>) => {
  if (!identifier || !reference) return false;
  return referencesEqual({ identifier, display: "" }, reference);
};

export const findDosageMatchingErrors = (d1: Dosage | undefined, d2: Dosage | undefined) => {
  if (!d1 || !d2) return [DosageError.EMPTY];

  const errors = [];
  if (d1.sequence !== d2.sequence) errors.push(DosageError.SEQUENCE);

  if (d1.timing?.repeat.boundsDuration.code !== d2.timing?.repeat.boundsDuration.code) {
    errors.push(DosageError.BOUNDS_CODE);
  }
  if (d1.timing?.repeat.boundsDuration.value !== d2.timing?.repeat.boundsDuration.value) {
    errors.push(DosageError.BOUNDS_VALUE);
  }
  if (d1.timing?.repeat.frequency !== d2.timing?.repeat.frequency) {
    errors.push(DosageError.FREQUENCY);
  }
  if (d1.timing?.repeat.period !== d2.timing?.repeat.period) {
    errors.push(DosageError.PERIOD);
  }
  if (d1.timing?.repeat.periodUnit !== d2.timing?.repeat.periodUnit) {
    errors.push(DosageError.PERIOD_UNIT);
  }

  const d1Week = d1.timing?.repeat.dayOfWeek;
  const d2Week = d2.timing?.repeat.dayOfWeek;
  if ((!!d1Week || !!d2Week) && (d1Week?.length !== d2Week?.length || !d1Week?.every((v) => d2Week?.includes(v)))) {
    errors.push(DosageError.DAY_OF_WEEK);
  }
  if (d1.doseAndRate?.[0].type.coding[0].code !== d2.doseAndRate?.[0].type.coding[0].code) {
    errors.push(DosageError.DOSE_RATE);
  }
  if (d1.doseAndRate?.[0].doseQuantity.code !== d2.doseAndRate?.[0].doseQuantity.code) {
    errors.push(DosageError.DOSE_TYPE);
  }
  if (d1.doseAndRate?.[0].doseQuantity.value !== d2.doseAndRate?.[0].doseQuantity.value) {
    errors.push(DosageError.DOSE);
  }

  console.debug("findDosageErrors", d1, d2, errors);
  return errors;
};

export const dosagesEqual = (d1: Dosage | undefined, d2: Dosage | undefined) => {
  return findDosageMatchingErrors(d1, d2).length === 0;
};

export const findMedicationRequestsMatchingErrors = (
  r1: BaseMedicationRequest | undefined,
  r2: BaseMedicationRequest | undefined
) => {
  if (!r1 || !r2) return [MedicationRequestError.EMPTY];

  const errors = [];

  if (r1.id !== r2.id) {
    errors.push(MedicationRequestError.ID);
  }
  if (r1.intent !== r2.intent) {
    errors.push(MedicationRequestError.INTENT);
  } else if (isPrescribed(r1) && isPrescribed(r2)) {
    const p1 = r1 as PrescriptionMedicationRequest;
    const p2 = r1 as PrescriptionMedicationRequest;

    if (
      (!!p1.priorPrescription || !!p2.priorPrescription) &&
      !referencesEqual(p1.priorPrescription, p2.priorPrescription)
    ) {
      errors.push(MedicationRequestError.PRIOR_PRESCRIPTION);
    }
    if ((!!p1.groupIdentifier || p2.groupIdentifier) && p1.groupIdentifier !== p2.groupIdentifier) {
      errors.push(MedicationRequestError.GROUP_IDENTIFIER);
    }
  }
  if (r1.status !== r2.status) {
    errors.push(MedicationRequestError.STATUS);
  }
  if (!!r1.basedOn || !!r2.basedOn) {
    if (!referencesEqual(r1.basedOn, r2.basedOn)) errors.push(MedicationRequestError.BASED_ON);
  }
  if (!referencesEqual(r1.subject, r2.subject)) {
    errors.push(MedicationRequestError.SUBJECT);
  }
  if (r1.medication.concept.coding[0]?.code !== r2.medication.concept.coding[0]?.code) {
    errors.push(MedicationRequestError.MEDICATION);
  }
  if (!referencesEqual(r1.informationSource[0], r2.informationSource[0])) {
    errors.push(MedicationRequestError.INFORMATION_SOURCE);
  }
  if (!!r1.supportingInformation || !!r2.supportingInformation) {
    if (!referencesEqual(r1.supportingInformation?.[0], r2.supportingInformation?.[0]))
      errors.push(MedicationRequestError.SUPPORTING_INFORMATION);
  }
  if (!referencesEqual(r1.requester, r2.requester)) {
    errors.push(MedicationRequestError.REQUESTER);
  }
  if (!referencesEqual(r1.performer[0], r2.performer[0])) {
    errors.push(MedicationRequestError.PERFORMER);
  }
  if (!!r1.dispenseRequest || !!r2.dispenseRequest) {
    if (!referencesEqual(r1.dispenseRequest?.dispenser, r2.dispenseRequest?.dispenser))
      errors.push(MedicationRequestError.DISPENSER);
  }

  const notEqualDosages = r1.dosageInstruction.filter(
    (v) =>
      !dosagesEqual(
        v,
        r2.dosageInstruction.find((w) => w.sequence === v.sequence)
      )
  );
  if (notEqualDosages.length > 0) {
    errors.push(MedicationRequestError.DOSAGE);
  }

  console.debug("findMedicationRequestsErrors", r1, r2, errors);
  return errors;
};

export const medicationRequestsEqual = (
  r1: BaseMedicationRequest | undefined,
  r2: BaseMedicationRequest | undefined
) => {
  return findMedicationRequestsMatchingErrors(r1, r2).length === 0;
};
