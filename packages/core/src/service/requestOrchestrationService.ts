import axios, { AxiosPromise } from "axios";
import { RequestOrchestration } from "../interface/linca/RequestOrchestration";

export const createRequestOrchestration = (orchestration: RequestOrchestration): AxiosPromise<RequestOrchestration> => {
  return axios.post("/fhir/RequestOrchestration", orchestration);
};
