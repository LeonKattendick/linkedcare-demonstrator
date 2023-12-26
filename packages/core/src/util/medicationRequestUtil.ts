import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";

export const isPrescribed = (request: BaseMedicationRequest) => {
  return request.intent === "order";
};
