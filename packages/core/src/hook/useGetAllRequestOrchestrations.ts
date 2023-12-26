import { useQuery } from "react-query";
import { getAllRequestOrchestrations } from "../service/requestOrchestrationService";

export const useGetAllRequestOrchestrations = () => {
  const { data, isLoading } = useQuery("useGetAllRequestOrchestrations", getAllRequestOrchestrations);

  return { orchestrations: data ?? [], isOrchestrationsLoading: isLoading };
};
