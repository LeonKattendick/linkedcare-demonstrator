import { useMemo } from "react";
import { BaseMedicationRequest } from "../../interface/linca/BaseMedicationRequest";
import { isAuthorizingPrescription } from "../../util/matchingUtil";
import { useGetAllMedicationDispenses } from "../query/useGetAllMedicationDispenses";

export const useGetAllMedicationDispensesByRequests = (requests: BaseMedicationRequest[]) => {
  const { dispenses, isDispensesLoading } = useGetAllMedicationDispenses();

  const relevantDispenses = useMemo(() => {
    return dispenses.filter((v) => requests.find((w) => isAuthorizingPrescription(v, w)));
  }, [requests, dispenses]);

  return { dispenses: relevantDispenses, isDispensesLoading };
};
