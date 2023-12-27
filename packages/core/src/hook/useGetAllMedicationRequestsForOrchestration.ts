import { InternalReference } from "../interface/linca/fhir/Reference";
import { useGetAllMedicationRequestsByPatient } from "./useGetAllMedicationRequestsByPatient";
import { useGetAllRequestOrchestrations } from "./useGetAllRequestOrchestrations";

export const useGetAllMedicationRequestsForOrchestration = (
  orderId: string | undefined,
  patientId: string | undefined
) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsByPatient(patientId);

  const orchestration = orchestrations.find((v) => v.id === orderId);
  const relevantRequests = requests?.filter(
    (v) =>
      (v.supportingInformation?.[0] as InternalReference)?.reference === `RequestOrchestration/${orchestration?.id}`
  );

  return { requests: relevantRequests, isRequestsLoading: isOrchestrationsLoading || isRequestsLoading };
};
