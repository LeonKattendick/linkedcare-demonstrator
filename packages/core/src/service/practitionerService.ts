import axios from "axios";
import { Practitioner } from "../interface/linca/fhir/Practitioner";

export const createPractitioner = (practitioner: Practitioner): Promise<Practitioner> => {
  return new Promise((res, rej) => {
    axios
      .post("/fhir/Practitioner", practitioner)
      .then((r) => res(r.data))
      .catch((e) => {
        console.error("createPractitioner", e);
        rej(e);
      });
  });
};
