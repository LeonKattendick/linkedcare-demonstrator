import { useMemo } from "react";
import { InternalReference } from "../interface/linca/fhir/Reference";
import { useGetAllMedicationRequestsByPatient } from "./useGetAllMedicationRequestsByPatient";
import { useGetAllRequestOrchestrations } from "./useGetAllRequestOrchestrations";

export const useGetAllRequestOrchestrationsByPatient = (patientId: string | undefined) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsByPatient(patientId);

  // Memoization is used to not compute this value on every rerender of the component
  const relevantOrchestrations = useMemo(
    () =>
      orchestrations.filter((v) =>
        requests?.find(
          (w) => (w.supportingInformation?.[0] as InternalReference)?.reference === `RequestOrchestration/${v.id}`
        )
      ),
    [orchestrations, requests]
  );

  return {
    orchestrations: relevantOrchestrations ?? [],
    isOrchestrationsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
