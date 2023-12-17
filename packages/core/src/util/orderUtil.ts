import { Patient } from "../interface/linca/Patient";
import { ProposalMedicationRequest } from "../interface/linca/ProposalMedicationRequest";
import { RequestOrchestration } from "../interface/linca/RequestOrchestration";
import { Organization } from "../interface/linca/fhir/Organization";
import { Practitioner } from "../interface/linca/fhir/Practitioner";
import { ExternalReference } from "../interface/linca/fhir/Reference";

export const createNewRequestOrchestration = (caregiver: Organization): RequestOrchestration => {
  return structuredClone({
    resourceType: "RequestOrchestration",
    status: "active",
    intent: "order",
    subject: { identifier: { ...caregiver.identifier[0] }, display: caregiver.name },
    contained: [],
  });
};

export const createNewProposalMedicationRequest = (
  patient: Patient,
  prescriber: { caregiver?: Organization; doctor?: Practitioner }
): ProposalMedicationRequest => {
  const careservice = prescriber?.caregiver?.partOf as ExternalReference;

  const informationSource = !!prescriber.caregiver
    ? { ...careservice }
    : { identifier: prescriber.doctor!.identifier[0], display: prescriber.doctor!.name[0].text };

  const requester = !!prescriber.caregiver
    ? { identifier: prescriber.caregiver.identifier[0], display: prescriber.caregiver.name }
    : { identifier: prescriber.doctor!.identifier[0], display: prescriber.doctor!.name[0].text };

  return structuredClone({
    resourceType: "MedicationRequest",
    status: "active",
    intent: "order",
    subject: {
      reference: `Patient/${patient.id}`,
    },
    medication: {
      concept: {
        coding: [],
      },
    },
    informationSource: informationSource,
    requester: requester,
    dispenseRequest: {},
    dosageInstruction: [],
  });
};