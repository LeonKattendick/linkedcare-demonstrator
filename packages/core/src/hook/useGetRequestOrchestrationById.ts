import { useQuery, useQueryClient } from "react-query";
import { getRequestOrchestrationById } from "../service/requestOrchestrationService";

export const useGetRequestOrchestrationById = (id?: string) => {
  const client = useQueryClient();
  const { data, isLoading } = useQuery(
    ["useGetRequestOrchestrationById", id],
    () => getRequestOrchestrationById(id as string),
    {
      enabled: !!id,
    }
  );

  const invalidateOrderById = (id: string) => {
    client.invalidateQueries(["useGetRequestOrchestrationById", id]);
  };

  return { orchestration: data ?? null, isOrchestrationLoading: isLoading, invalidateOrderById };
};
