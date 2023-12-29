import { useMemo } from "react";
import { requestIsFromOrchestration } from "../util/matchingUtil";
import { useGetAllMedicationRequestsByPatient } from "./useGetAllMedicationRequestsByPatient";
import { useGetAllRequestOrchestrations } from "./useGetAllRequestOrchestrations";

export const useGetAllMedicationRequestsForOrchestration = (
  orderId: string | undefined,
  patientId: string | undefined
) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsByPatient(patientId);

  // Memoization is used to not compute this value on every rerender of the component
  const relevantRequests = useMemo(() => {
    const orchestration = orchestrations.find((v) => v.id === orderId);
    return requests.filter((v) => !!requestIsFromOrchestration(v, orchestration));
  }, [orchestrations, requests]);

  return { requests: relevantRequests ?? [], isRequestsLoading: isOrchestrationsLoading || isRequestsLoading };
};
