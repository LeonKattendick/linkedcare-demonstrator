import axios from "axios";
import { Bundle } from "../interface/linca/fhir/Bundle";
import { Organization } from "../interface/linca/fhir/Organization";

export const createOrganization = (organization: Organization) => {
  return axios.post("/fhir/Organization", organization);
};

export const getAllOrganizations = (): Promise<Organization[]> => {
  return new Promise((res, rej) => {
    axios
      .get("/fhir/Organization")
      .then((r) => {
        const organizations = r.data as Bundle<Organization>;
        res(organizations.entry.map((v) => v.resource));
      })
      .catch(rej);
  });
};
