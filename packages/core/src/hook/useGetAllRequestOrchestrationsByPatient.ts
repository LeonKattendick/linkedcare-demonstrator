import { useMemo } from "react";
import { requestIsFromOrchestration } from "../util/matchingUtil";
import { useGetAllMedicationRequestsByPatient } from "./useGetAllMedicationRequestsByPatient";
import { useGetAllRequestOrchestrations } from "./useGetAllRequestOrchestrations";

export const useGetAllRequestOrchestrationsByPatient = (patientId: string | undefined) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsByPatient(patientId);

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
