import axios from "axios";
import { CapabilityStatement } from "../interface/fhir/CapabilityStatement";

export const getMetadata = (): Promise<CapabilityStatement> => {
  return new Promise((res, rej) => {
    axios
      .get("/fhir/metadata")
      .then((r) => res(r.data))
      .catch(rej);
  });
};
