import axios from "axios";
import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";

export const createMedicationRequest = (r: BaseMedicationRequest): Promise<BaseMedicationRequest> => {
  return new Promise((res, rej) => {
    axios
      .post("/fhir/MedicationRequest", r)
      .then((r) => res(r.data))
      .catch((e) => {
        console.error("createMedicationRequest", e);
        rej(e);
      });
  });
};
