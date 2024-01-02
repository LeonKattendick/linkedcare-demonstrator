import { useQuery, useQueryClient } from "react-query";
import { getAllMedicationRequestsByPatient } from "../../service/medicatonRequestService";

export const useGetAllMedicationRequestsByPatient = (patientId?: string) => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery(
    ["useGetAllMedicationRequestsByPatient", patientId],
    () => getAllMedicationRequestsByPatient(patientId as string),
    {
      enabled: !!patientId,
    }
  );

  const invalidateAllMedicationRequests = () => {
    client.invalidateQueries("useGetAllMedicationRequests");
    client.invalidateQueries({ predicate: (query) => query.queryKey[0] === "useGetAllMedicationRequestsByPatient" });
  };

  return { requests: data ?? [], isRequestsLoading: isLoading, invalidateAllMedicationRequests };
};
