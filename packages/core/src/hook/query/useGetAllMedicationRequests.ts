import { useQuery } from "react-query";
import { getAllMedicationRequests } from "../../service/medicatonRequestService";

export const useGetAllMedicationRequests = () => {
  const { data, isLoading } = useQuery("useGetAllMedicationRequests", getAllMedicationRequests);

  return { requests: data ?? [], isRequestsLoading: isLoading };
};
