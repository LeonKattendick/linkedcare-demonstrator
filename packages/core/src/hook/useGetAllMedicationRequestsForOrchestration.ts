import { useMemo } from "react";
import { InternalReference } from "../interface/linca/fhir/Reference";
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
    return requests.filter(
      (v) =>
        (v.supportingInformation?.[0] as InternalReference)?.reference === `RequestOrchestration/${orchestration?.id}`
    );
  }, [orchestrations, requests]);

  return { requests: relevantRequests ?? [], isRequestsLoading: isOrchestrationsLoading || isRequestsLoading };
};
