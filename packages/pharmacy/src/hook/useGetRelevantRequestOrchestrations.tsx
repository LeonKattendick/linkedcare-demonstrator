import { useGetAllValidMedicationRequests } from "core/src/hook/filter/useGetAllValidMedicationRequests";
import { useGetAllRequestOrchestrations } from "core/src/hook/query/useGetAllRequestOrchestrations";
import { usePermissions } from "core/src/hook/usePermissions";
import { requestIsFromOrchestration } from "core/src/util/matchingUtil";
import { useMemo } from "react";
import { useSelectedPharmacyAtom } from "./useSelectedPharmacyAtom";

export const useGetRelevantRequestOrchestrations = () => {
  const { selectedPharmacy } = useSelectedPharmacyAtom();
  const perms = usePermissions();

  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequests();

  // Memoization is used to not compute this value on every rerender of the component
  const relevantOrchestrations = useMemo(() => {
    const validRequests = requests.filter(
      (v) => perms.canPharmacySeeRequest(v, selectedPharmacy) && perms.canCompleteMedication(v)
    );

    return orchestrations.filter((v) => validRequests.find((w) => requestIsFromOrchestration(w, v)));
  }, [selectedPharmacy, orchestrations, requests]);

  return {
    orchestrations: relevantOrchestrations ?? [],
    isOrchestrationsLoading: isOrchestrationsLoading || isRequestsLoading,
  };
};
