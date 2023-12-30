import { useMemo } from "react";
import { PrescriptionMedicationRequest } from "../interface/linca/PrescriptionMedicationRequest";
import { InternalReference } from "../interface/linca/fhir/Reference";
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
    const requestsForOrchestration = requests.filter((v) => !!requestIsFromOrchestration(v, orchestration));

    const linkedRequestIds = new Set<string>();
    for (const request of requestsForOrchestration) {
      const basedOn = request.basedOn?.[0] as InternalReference;
      const priorPrescription = (request as PrescriptionMedicationRequest).priorPrescription as InternalReference;

      if (!!basedOn) linkedRequestIds.add(basedOn.reference!);
      if (!!priorPrescription) linkedRequestIds.add(priorPrescription.reference!);
    }

    return requestsForOrchestration.filter((v) => !linkedRequestIds.has(`MedicationRequest/${v.id}`));
  }, [orderId, orchestrations, requests]);

  return { requests: relevantRequests ?? [], isRequestsLoading: isOrchestrationsLoading || isRequestsLoading };
};
