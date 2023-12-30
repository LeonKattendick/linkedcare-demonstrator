import axios from "axios";
import { RequestOrchestration } from "../interface/linca/RequestOrchestration";
import { Bundle } from "../interface/linca/fhir/Bundle";

export const createRequestOrchestration = (orchestration: RequestOrchestration): Promise<RequestOrchestration> => {
  return new Promise((res, rej) => {
    axios
      .post("/fhir/RequestOrchestration", orchestration)
      .then((r) => res(r.data))
      .catch((e) => {
        console.error("createRequestOrchestration", e);
        rej(e);
      });
  });
};

export const updateRequestOrchestration = (orchestration: RequestOrchestration): Promise<RequestOrchestration> => {
  return new Promise((res, rej) => {
    axios
      .put(`/fhir/RequestOrchestration/${orchestration.id}`, orchestration)
      .then((r) => res(r.data))
      .catch((e) => {
        console.error("updateRequestOrchestration", e);
        rej(e);
      });
  });
};

export const getAllRequestOrchestrations = (): Promise<RequestOrchestration[]> => {
  return new Promise((res, rej) => {
    axios
      .get("/fhir/RequestOrchestration", { headers: { "Cache-Control": "no-cache" } })
      .then((r) => {
        const bundle = r.data as Bundle<RequestOrchestration>;
        res(bundle.total > 0 ? bundle.entry!.map((v) => v.resource) : []);
      })
      .catch(rej);
  });
};

export const getRequestOrchestrationById = (id: string): Promise<RequestOrchestration | null> => {
  return new Promise((res, rej) => {
    axios
      .get(`/fhir/RequestOrchestration?_id=${id}`, { headers: { "Cache-Control": "no-cache" } })
      .then((r) => {
        const bundle = r.data as Bundle<RequestOrchestration>;
        res(bundle.total === 1 ? bundle.entry![0].resource : null);
      })
      .catch(rej);
  });
};
