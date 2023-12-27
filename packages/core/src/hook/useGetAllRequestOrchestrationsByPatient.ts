import { InternalReference } from "../interface/linca/fhir/Reference";
import { useGetAllMedicationRequestsByPatient } from "./useGetAllMedicationRequestsByPatient";
import { useGetAllRequestOrchestrations } from "./useGetAllRequestOrchestrations";

export const useGetAllRequestOrchestrationsByPatient = (patientId: string | undefined) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsByPatient(patientId);

  return {
    orchestrations: orchestrations.filter((v) =>
      requests?.find(
        (w) => (w.supportingInformation?.[0] as InternalReference)?.reference === `RequestOrchestration/${v.id}`
      )
    ),
    isOrchestrationsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
