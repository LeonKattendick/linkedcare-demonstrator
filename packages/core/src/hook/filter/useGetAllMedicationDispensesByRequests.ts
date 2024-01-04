import { useMemo } from "react";
import { BaseMedicationRequest } from "../../interface/linca/BaseMedicationRequest";
import { InternalReference } from "../../interface/linca/fhir/Reference";
import { useGetAllMedicationDispenses } from "../query/useGetAllMedicationDispenses";

export const useGetAllMedicationDispensesByRequests = (requests: BaseMedicationRequest[]) => {
  const { dispenses, isDispensesLoading } = useGetAllMedicationDispenses();

  const relevantDispenses = useMemo(() => {
    return dispenses.filter((v) =>
      requests.find(
        (w) => (v.authorizingPrescription[0] as InternalReference).reference === `MedicationRequest/${w.id}`
      )
    );
  }, [requests, dispenses]);

  return { dispenses: relevantDispenses, isDispensesLoading };
};
