import { useMemo } from "react";
import { filterValidRequests } from "../../util/medicationRequestUtil";
import { useGetAllMedicationRequests } from "../query/useGetAllMedicationRequests";

/*
 * All MedicationRequests that are not linked in another MedicationRequest
 */
export const useGetAllValidMedicationRequests = () => {
  const { requests, isRequestsLoading } = useGetAllMedicationRequests();

  // Memoization is used to not compute this value on every rerender of the component
  const validRequests = useMemo(() => filterValidRequests(requests), [requests]);

  return { requests: validRequests ?? [], isRequestsLoading };
};
