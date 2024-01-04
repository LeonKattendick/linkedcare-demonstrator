import { MedicationDispense } from "../interface/linca/MedicationDispense";
import { Patient } from "../interface/linca/Patient";
import { PrescriptionMedicationRequest } from "../interface/linca/PrescriptionMedicationRequest";
import { ProposalMedicationRequest } from "../interface/linca/ProposalMedicationRequest";
import { RequestOrchestration } from "../interface/linca/RequestOrchestration";
import { Dosage } from "../interface/linca/fhir/Dosage";
import { Organization } from "../interface/linca/fhir/Organization";
import { Practitioner } from "../interface/linca/fhir/Practitioner";
import { ExternalReference } from "../interface/linca/fhir/Reference";
import { doctorModels } from "../model/doctorModels";

export const createNewRequestOrchestration = (caregiver: Organization): RequestOrchestration => {
  return structuredClone({
    resourceType: "RequestOrchestration",
    status: "active",
    intent: "proposal",
    subject: { identifier: { ...caregiver.identifier[0] }, display: caregiver.name },
    contained: [],
  });
};

export const createNewProposalMedicationRequest = (
  patient: Patient,
  prescriber: { caregiver?: Organization; doctor?: Practitioner },
  order?: RequestOrchestration
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
    intent: "proposal",
    subject: {
      reference: `Patient/${patient.id}`,
    },
    medication: {
      concept: {
        coding: [],
      },
    },
    supportingInformation: order ? [{ reference: `RequestOrchestration/${order.id}` }] : undefined,
    informationSource: [informationSource],
    requester: requester,
    performer: [{ identifier: doctorModels[0].identifier[0], display: doctorModels[0].name[0].text }],

    dosageInstruction: [],
  });
};

export const createNewMedicationDispense = (
  r: PrescriptionMedicationRequest,
  pharmacy: Organization,
  isPartial?: boolean
): MedicationDispense => {
  return structuredClone({
    resourceType: "MedicationDispense",
    status: "completed",
    medication: r.medication,
    subject: r.subject,
    performer: [{ actor: { identifier: pharmacy.identifier[0], display: pharmacy.name } }],
    authorizingPrescription: [{ reference: `MedicationRequest/${r.id}` }],
    type: {
      coding: [{ system: "http://terminology.hl7.org/CodeSystem/v3-ActCode", code: isPartial ? "FFP" : "FFC" }],
    },
    dosageInstruction: r.dosageInstruction,
  });
};

export const createNewDosage = (sequence: number, code: string): Dosage => {
  return structuredClone({
    sequence,
    text: "",
    timing: {
      repeat: { boundsDuration: { value: 1, code: "mo" }, frequency: 1, period: 1, periodUnit: "d", dayOfWeek: [] },
    },
    doseAndRate: [
      {
        type: {
          coding: [
            { system: "http://terminology.hl7.org/CodeSystem/dose-rate-type", code: "ordered", display: "Ordered" },
          ],
        },
        doseQuantity: {
          system: "https://termgit.elga.gv.at/ValueSet/elga-medikationdarreichungsform",
          value: 1,
          code,
        },
      },
    ],
  });
};
