import { useMemo } from "react";
import { filterValidRequests } from "../../util/medicationRequestUtil";
import { useGetAllMedicationRequestsByPatient } from "../query/useGetAllMedicationRequestsByPatient";
import { useGetAllRequestOrchestrations } from "../query/useGetAllRequestOrchestrations";

/*
 * All MedicationRequests for a patient that are not linked in another MedicationRequest
 */
export const useGetAllValidMedicationRequestsByPatient = (patientId: string | undefined) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsByPatient(patientId);

  // Memoization is used to not compute this value on every rerender of the component
  const validRequests = useMemo(() => filterValidRequests(requests), [orchestrations, requests]);

  return {
    requests: validRequests ?? [],
    isRequestsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
