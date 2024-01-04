import { useQuery, useQueryClient } from "react-query";
import { getAllMedicationDispensesByPatient } from "../../service/medicationDispenseService";

export const useGetAllMedicationDispensesByPatient = (patientId?: string) => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery(
    ["useGetAllMedicationDispensesByPatient", patientId],
    () => getAllMedicationDispensesByPatient(patientId as string),
    {
      enabled: !!patientId,
    }
  );

  const invalidateAllMedicationDispenses = () => {
    client.invalidateQueries("useGetAllMedicationDispenses");
    client.invalidateQueries({ predicate: (query) => query.queryKey[0] === "useGetAllMedicationDispensesByPatient" });
  };

  return { dispenses: data ?? [], isDispensesLoading: isLoading, invalidateAllMedicationDispenses };
};
