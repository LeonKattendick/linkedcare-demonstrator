import axios from "axios";
import { Patient } from "../interface/linca/Patient";

export const createPatient = (patient: Patient) => {
  return axios.post("/fhir/Patient", patient);
};
