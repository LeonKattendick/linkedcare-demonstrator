import axios from "axios";
import { Bundle } from "../interface/linca/fhir/Bundle";
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

export const getAllOrganzitationsByType = (type: "prov" | "other"): Promise<Organization[]> => {
  return new Promise((res, rej) => {
    axios
      .get(`/fhir/Organization?type=${type}`, { headers: { "Cache-Control": "no-cache" } })
      .then((r) => {
        const bundle = r.data as Bundle<Organization>;
        res(bundle.entry?.map((v) => v.resource) ?? []);
      })
      .catch(rej);
  });
};
