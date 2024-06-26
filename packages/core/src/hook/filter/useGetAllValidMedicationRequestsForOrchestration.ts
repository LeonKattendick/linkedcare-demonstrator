import { useMemo } from "react";
import { requestIsFromOrchestration } from "../../util/matchingUtil";
import { useGetAllRequestOrchestrations } from "../query/useGetAllRequestOrchestrations";
import { useGetAllValidMedicationRequestsByPatient } from "./useGetAllValidMedicationRequestsByPatient";

/*
 * All valid MedicationRequests for a RequestOrchestration
 */
export const useGetAllValidMedicationRequestsForOrchestration = (
  orderId: string | undefined,
  patientId: string | undefined
) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequestsByPatient(patientId);

  // Memoization is used to not compute this value on every rerender of the component
  const relevantRequests = useMemo(() => {
    const orchestration = orchestrations.find((v) => v.id === orderId);

    return requests.filter((v) => !!requestIsFromOrchestration(v, orchestration));
  }, [orderId, orchestrations, requests]);

  return {
    requests: relevantRequests ?? [],
    isRequestsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
