import axios, { AxiosPromise } from "axios";
import { Patient } from "../interface/linca/Patient";
import { Bundle } from "../interface/linca/fhir/Bundle";

export const createPatient = (patient: Patient): AxiosPromise<Patient> => {
  return axios.post("/fhir/Patient", patient);
};

export const getAllPatients = (): Promise<Patient[]> => {
  return new Promise((res, rej) => {
    axios
      .get("/fhir/Patient")
      .then((r) => {
        const bundle = r.data as Bundle<Patient>;
        res(bundle.total > 0 ? bundle.entry!.map((v) => v.resource) : []);
      })
      .catch(rej);
  });
};

export const getPatientById = (id: string): Promise<Patient | null> => {
  return new Promise((res, rej) => {
    axios
      .get(`/fhir/Patient?_id=${id}`)
      .then((r) => {
        const bundle = r.data as Bundle<Patient>;
        res(bundle.total === 1 ? bundle.entry![0].resource : null);
      })
      .catch(rej);
  });
};
