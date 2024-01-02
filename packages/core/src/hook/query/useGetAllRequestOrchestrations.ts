import { useQuery, useQueryClient } from "react-query";
import { getAllRequestOrchestrations } from "../../service/requestOrchestrationService";

export const useGetAllRequestOrchestrations = () => {
  const client = useQueryClient();
  const { data, isLoading } = useQuery("useGetAllRequestOrchestrations", getAllRequestOrchestrations);

  const invalidateAllRequestOrchestrations = () => {
    client.invalidateQueries("useGetAllRequestOrchestrations");
  };

  return { orchestrations: data ?? [], isOrchestrationsLoading: isLoading, invalidateAllRequestOrchestrations };
};
