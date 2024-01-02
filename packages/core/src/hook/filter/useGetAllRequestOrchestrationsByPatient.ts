import { useMemo } from "react";
import { requestIsFromOrchestration } from "../../util/matchingUtil";
import { useGetAllRequestOrchestrations } from "../query/useGetAllRequestOrchestrations";
import { useGetAllValidMedicationRequestsByPatient } from "./useGetAllValidMedicationRequestsByPatient";

/*
 * All RequestOrchestrations for a patient that include one valid MedicationRequest
 */
export const useGetAllRequestOrchestrationsByPatient = (patientId: string | undefined) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequestsByPatient(patientId);

  // Memoization is used to not compute this value on every rerender of the component
  const relevantOrchestrations = useMemo(
    () => orchestrations.filter((v) => !!requests.find((w) => requestIsFromOrchestration(w, v))),
    [orchestrations, requests]
  );

  return {
    orchestrations: relevantOrchestrations ?? [],
    isOrchestrationsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
