import { useMemo } from "react";
import { PrescriptionMedicationRequest } from "../interface/linca/PrescriptionMedicationRequest";
import { InternalReference } from "../interface/linca/fhir/Reference";
import { useGetAllMedicationRequestsByPatient } from "./useGetAllMedicationRequestsByPatient";
import { useGetAllRequestOrchestrations } from "./useGetAllRequestOrchestrations";

/*
 * All MedicationRequests for a patient that are not linked in another MedicationRequest
 */
export const useGetAllValidMedicationRequestsByPatient = (patientId: string | undefined) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsByPatient(patientId);

  // Memoization is used to not compute this value on every rerender of the component
  const validRequests = useMemo(() => {
    const linkedRequestIds = new Set<string>();
    for (const request of requests) {
      const basedOn = request.basedOn?.[0] as InternalReference;
      const priorPrescription = (request as PrescriptionMedicationRequest).priorPrescription as InternalReference;

      if (!!basedOn) linkedRequestIds.add(basedOn.reference!);
      if (!!priorPrescription) linkedRequestIds.add(priorPrescription.reference!);
    }

    return requests.filter((v) => !linkedRequestIds.has(`MedicationRequest/${v.id}`));
  }, [orchestrations, requests]);

  return {
    requests: validRequests ?? [],
    isRequestsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
