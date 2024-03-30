import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";
import { InternalReference } from "../interface/linca/fhir/Reference";
import { PrescriptionMedicationRequest } from "../interface/linca/PrescriptionMedicationRequest";

export const isPrescribed = (request: BaseMedicationRequest) => {
  return request.intent === "order";
};

export const filterValidRequests = (requests: BaseMedicationRequest[]) => {
  const linkedRequestIds = new Set<string>();

  for (const request of requests) {
    const basedOn = request.basedOn?.[0] as InternalReference;
    const priorPrescription = (request as PrescriptionMedicationRequest).priorPrescription as InternalReference;

    if (basedOn) linkedRequestIds.add(basedOn.reference!);
    if (priorPrescription) linkedRequestIds.add(priorPrescription.reference!);
  }

  return requests.filter((v) => !linkedRequestIds.has(`MedicationRequest/${v.id}`));
};
