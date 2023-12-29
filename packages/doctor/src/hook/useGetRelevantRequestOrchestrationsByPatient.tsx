import { useGetAllMedicationRequestsByPatient } from "core/src/hook/useGetAllMedicationRequestsByPatient";
import { useGetAllRequestOrchestrationsByPatient } from "core/src/hook/useGetAllRequestOrchestrationsByPatient";
import { identifierEqualsReference, requestIsFromOrchestration } from "core/src/util/matchingUtil";
import { useMemo } from "react";
import { useSelectedDoctorAtom } from "./useSelectedDoctorAtom";

export const useGetRelevantRequestOrchestrationsByPatient = (patientId: string | undefined) => {
  const { selectedDoctor } = useSelectedDoctorAtom();

  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrationsByPatient(patientId);
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsByPatient(patientId);

  // Memoization is used to not compute this value on every rerender of the component
  const relevantOrchestrations = useMemo(() => {
    const relevant = [];

    for (const orchestration of orchestrations) {
      const requestsForOrchestration = requests.filter((v) => !!requestIsFromOrchestration(v, orchestration));
      for (const request of requestsForOrchestration) {
        if (identifierEqualsReference(selectedDoctor?.identifier[0], request.performer[0])) {
          relevant.push(orchestration);
        }
      }
    }

    return relevant;
  }, [selectedDoctor, orchestrations, requests]);

  return {
    orchestrations: relevantOrchestrations,
    isOrchestrationsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
