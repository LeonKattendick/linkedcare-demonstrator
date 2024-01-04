import axios from "axios";
import { MedicationDispense } from "../interface/linca/MedicationDispense";
import { Bundle } from "../interface/linca/fhir/Bundle";

export const createMedicationDispense = (r: MedicationDispense): Promise<MedicationDispense> => {
  return new Promise((res, rej) => {
    axios
      .post("/fhir/MedicationDispense", r)
      .then((r) => res(r.data))
      .catch((e) => {
        console.error("createMedicationDispense", e);
        rej(e);
      });
  });
};

export const getAllMedicationDispenses = (): Promise<MedicationDispense[]> => {
  return new Promise((res, rej) => {
    axios
      .get(`/fhir/MedicationDispense?_count=10000`, {
        headers: { "Cache-Control": "no-cache" },
      })
      .then((r) => {
        const bundle = r.data as Bundle<MedicationDispense>;
        res(bundle.entry?.map((v) => v.resource) ?? []);
      })
      .catch(rej);
  });
};

export const getAllMedicationDispensesByPatient = (patientId: string): Promise<MedicationDispense[]> => {
  return new Promise((res, rej) => {
    axios
      .get(`/fhir/MedicationDispense?subject=Patient/${patientId}&_count=10000`, {
        headers: { "Cache-Control": "no-cache" },
      })
      .then((r) => {
        const bundle = r.data as Bundle<MedicationDispense>;
        res(bundle.entry?.map((v) => v.resource) ?? []);
      })
      .catch(rej);
  });
};
