import { useMemo } from "react";
import { BaseMedicationRequest } from "../../interface/linca/BaseMedicationRequest";
import { InternalReference } from "../../interface/linca/fhir/Reference";
import { useGetAllMedicationDispensesByPatient } from "../query/useGetAllMedicationDispensesByPatient";

export const useGetAllMedicationDispensesByPatientAndRequests = (
  patientId: string | undefined,
  requests: BaseMedicationRequest[]
) => {
  const { dispenses, isDispensesLoading } = useGetAllMedicationDispensesByPatient(patientId);

  const relevantDispenses = useMemo(() => {
    return dispenses.filter((v) =>
      requests.find(
        (w) => (v.authorizingPrescription[0] as InternalReference).reference === `MedicationRequest/${w.id}`
      )
    );
  }, [requests, dispenses]);

  return { dispenses: relevantDispenses, isDispensesLoading };
};
