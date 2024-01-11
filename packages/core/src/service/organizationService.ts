import axios from "axios";
import { Organization } from "../interface/linca/fhir/Organization";

export const createOrganization = (organization: Organization): Promise<Organization> => {
  return new Promise((res, rej) => {
    axios
      .post("/fhir/Organization", organization)
      .then((r) => res(r.data))
      .catch((e) => {
        console.error("createOrganization", e);
        rej(e);
      });
  });
};
