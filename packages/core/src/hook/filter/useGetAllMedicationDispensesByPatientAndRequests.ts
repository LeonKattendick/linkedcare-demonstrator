import { useMemo } from "react";
import { BaseMedicationRequest } from "../../interface/linca/BaseMedicationRequest";
import { isAuthorizingPrescription } from "../../util/matchingUtil";
import { useGetAllMedicationDispensesByPatient } from "../query/useGetAllMedicationDispensesByPatient";

export const useGetAllMedicationDispensesByPatientAndRequests = (
  patientId: string | undefined,
  requests: BaseMedicationRequest[]
) => {
  const { dispenses, isDispensesLoading } = useGetAllMedicationDispensesByPatient(patientId);

  const relevantDispenses = useMemo(() => {
    return dispenses.filter((v) => requests.find((w) => isAuthorizingPrescription(v, w)));
  }, [requests, dispenses]);

  return { dispenses: relevantDispenses, isDispensesLoading };
};
