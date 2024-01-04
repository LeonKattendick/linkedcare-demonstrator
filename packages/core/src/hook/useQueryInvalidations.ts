import { useQueryClient } from "react-query";

export const useQueryInvalidations = () => {
  const client = useQueryClient();

  const invalidateAllMedicationDispenses = () => {
    client.invalidateQueries("useGetAllMedicationDispenses");
    client.invalidateQueries({ predicate: (query) => query.queryKey[0] === "useGetAllMedicationDispensesByPatient" });
  };

  const invalidateAllMedicationRequests = () => {
    client.invalidateQueries("useGetAllMedicationRequests");
    client.invalidateQueries({ predicate: (query) => query.queryKey[0] === "useGetAllMedicationRequestsByPatient" });
  };

  const invalidateAllRequestOrchestrations = () => {
    client.invalidateQueries("useGetAllRequestOrchestrations");
  };

  const invalidateOrderById = (id: string) => {
    client.invalidateQueries(["useGetRequestOrchestrationById", id]);
  };

  return {
    invalidateAllMedicationDispenses,
    invalidateAllMedicationRequests,
    invalidateAllRequestOrchestrations,
    invalidateOrderById,
  };
};
