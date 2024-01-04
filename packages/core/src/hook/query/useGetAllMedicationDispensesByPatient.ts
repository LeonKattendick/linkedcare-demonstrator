import { useQuery } from "react-query";
import { getAllMedicationDispensesByPatient } from "../../service/medicationDispenseService";

export const useGetAllMedicationDispensesByPatient = (patientId?: string) => {
  const { data, isLoading } = useQuery(
    ["useGetAllMedicationDispensesByPatient", patientId],
    () => getAllMedicationDispensesByPatient(patientId as string),
    {
      enabled: !!patientId,
    }
  );

  return { dispenses: data ?? [], isDispensesLoading: isLoading };
};
