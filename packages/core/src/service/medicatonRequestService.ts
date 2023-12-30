import axios from "axios";
import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";
import { Bundle } from "../interface/linca/fhir/Bundle";

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

export const getAllMedicationRequestsByPatient = (patientId: string): Promise<BaseMedicationRequest[]> => {
  return new Promise((res, rej) => {
    axios
      .get(`/fhir/MedicationRequest?subject=Patient/${patientId}&_count=10000`, {
        headers: { "Cache-Control": "no-cache" },
      })
      .then((r) => {
        const bundle = r.data as Bundle<BaseMedicationRequest>;
        console.log(bundle);
        res(bundle.entry?.map((v) => v.resource) ?? []);
      })
      .catch(rej);
  });
};
