import axios from "axios";
import { Bundle } from "../interface/linca/fhir/Bundle";
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

export const getAllPractitioners = (): Promise<Practitioner[]> => {
  return new Promise((res, rej) => {
    axios
      .get("/fhir/Practitioner", { headers: { "Cache-Control": "no-cache" } })
      .then((r) => {
        const bundle = r.data as Bundle<Practitioner>;
        res(bundle.entry?.map((v) => v.resource) ?? []);
      })
      .catch(rej);
  });
};
