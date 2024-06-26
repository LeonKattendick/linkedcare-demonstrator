import axios from "axios";
import { Patient } from "../interface/linca/Patient";
import { Bundle } from "../interface/linca/fhir/Bundle";

export const createPatient = (patient: Patient): Promise<Patient> => {
  return new Promise((res, rej) => {
    axios
      .post("/fhir/Patient", patient)
      .then((r) => res(r.data))
      .catch((e) => {
        console.error("createPatient", e);
        rej(e);
      });
  });
};

export const getAllPatients = (): Promise<Patient[]> => {
  return new Promise((res, rej) => {
    axios
      .get("/fhir/Patient", { headers: { "Cache-Control": "no-cache" } })
      .then((r) => {
        const bundle = r.data as Bundle<Patient>;
        res(bundle.entry?.map((v) => v.resource) ?? []);
      })
      .catch(rej);
  });
};

export const getPatientById = (id: string): Promise<Patient | null> => {
  return new Promise((res, rej) => {
    axios
      .get(`/fhir/Patient?_id=${id}`, { headers: { "Cache-Control": "no-cache" } })
      .then((r) => {
        const bundle = r.data as Bundle<Patient>;
        res(bundle.entry?.[0].resource ?? null);
      })
      .catch(rej);
  });
};
