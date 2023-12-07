import axios from "axios";
import { Patient } from "../interface/linca/Patient";
import { Bundle } from "../interface/linca/fhir/Bundle";

export const createPatient = (patient: Patient) => {
  return axios.post("/fhir/Patient", patient);
};

export const getAllPatients = (): Promise<Patient[]> => {
  return new Promise((res, rej) => {
    axios
      .get("/fhir/Patient")
      .then((r) => {
        const patients = r.data as Bundle<Patient>;
        res(patients.entry.map((v) => v.resource));
      })
      .catch(rej);
  });
};
