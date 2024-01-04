import { useQuery } from "react-query";
import { getAllMedicationDispenses } from "../../service/medicationDispenseService";

export const useGetAllMedicationDispenses = () => {
  const { data, isLoading } = useQuery("useGetAllMedicationDispenses", getAllMedicationDispenses);

  return { dispenses: data ?? [], isDispensesLoading: isLoading };
};
