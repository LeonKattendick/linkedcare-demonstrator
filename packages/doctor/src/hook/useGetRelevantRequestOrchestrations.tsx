import { useGetAllValidMedicationRequests } from "core/src/hook/filter/useGetAllValidMedicationRequests";
import { useGetAllRequestOrchestrations } from "core/src/hook/query/useGetAllRequestOrchestrations";
import { usePermissions } from "core/src/hook/usePermissions";
import { requestIsFromOrchestration } from "core/src/util/matchingUtil";
import { useMemo } from "react";
import { useSelectedDoctorAtom } from "./useSelectedDoctorAtom";

export const useGetRelevantRequestOrchestrations = () => {
  const { selectedDoctor } = useSelectedDoctorAtom();
  const perms = usePermissions();

  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequests();

  // Memoization is used to not compute this value on every rerender of the component
  const relevantOrchestrations = useMemo(() => {
    const validRequests = requests.filter(
      (v) => perms.canDoctorSeeRequest(v, selectedDoctor) && perms.canPrescribeMedication(v)
    );

    return orchestrations.filter((v) => validRequests.find((w) => requestIsFromOrchestration(w, v)));
  }, [selectedDoctor, orchestrations, requests, perms]);

  return {
    orchestrations: relevantOrchestrations ?? [],
    isOrchestrationsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
