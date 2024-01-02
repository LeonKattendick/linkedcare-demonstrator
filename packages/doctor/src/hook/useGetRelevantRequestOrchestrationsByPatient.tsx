import { useGetAllRequestOrchestrationsByPatient } from "core/src/hook/filter/useGetAllRequestOrchestrationsByPatient";
import { useGetAllValidMedicationRequestsByPatient } from "core/src/hook/filter/useGetAllValidMedicationRequestsByPatient";
import { identifierEqualsReference, requestIsFromOrchestration } from "core/src/util/matchingUtil";
import { useMemo } from "react";
import { useSelectedDoctorAtom } from "./useSelectedDoctorAtom";

/*
 * All RequestOrchestrations that have one MedicationRequest where the current doctor is linked as performer
 */
export const useGetRelevantRequestOrchestrationsByPatient = (patientId: string | undefined) => {
  const { selectedDoctor } = useSelectedDoctorAtom();

  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrationsByPatient(patientId);
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequestsByPatient(patientId);

  // Memoization is used to not compute this value on every rerender of the component
  const relevantOrchestrations = useMemo(() => {
    const validRequests = requests.filter((v) =>
      identifierEqualsReference(selectedDoctor?.identifier[0], v.performer[0])
    );

    return orchestrations.filter((v) => validRequests.find((w) => requestIsFromOrchestration(w, v)));
  }, [selectedDoctor, orchestrations, requests]);

  return {
    orchestrations: relevantOrchestrations,
    isOrchestrationsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
