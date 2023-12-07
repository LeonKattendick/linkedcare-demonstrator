import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";
import { PRESCRIPTION_PROFILE_LINK } from "../interface/linca/PrescriptionMedicationRequest";

export const isPrescribed = (request: BaseMedicationRequest) => {
  return request.meta?.profile?.[0] === PRESCRIPTION_PROFILE_LINK;
};
