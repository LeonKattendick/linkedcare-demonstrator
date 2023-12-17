import { RequestOrchestration } from "../interface/linca/RequestOrchestration";
import { Organization } from "../interface/linca/fhir/Organization";

export const createNewRequestOrchestration = (caregiver: Organization): RequestOrchestration => {
  return structuredClone({
    resourceType: "RequestOrchestration",
    status: "active",
    intent: "order",
    subject: { identifier: { ...caregiver.identifier[0] }, display: caregiver.name },
    contained: [],
  });
};
