import { useQuery } from "react-query";
import { getAllMedicationRequestsByPatient } from "../../service/medicatonRequestService";

export const useGetAllMedicationRequestsByPatient = (patientId?: string) => {
  const { data, isLoading } = useQuery(
    ["useGetAllMedicationRequestsByPatient", patientId],
    () => getAllMedicationRequestsByPatient(patientId as string),
    {
      enabled: !!patientId,
    }
  );

  return { requests: data ?? [], isRequestsLoading: isLoading };
};
