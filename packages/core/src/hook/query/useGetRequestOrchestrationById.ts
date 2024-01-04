import { useQuery } from "react-query";
import { getRequestOrchestrationById } from "../../service/requestOrchestrationService";

export const useGetRequestOrchestrationById = (id?: string) => {
  const { data, isLoading } = useQuery(
    ["useGetRequestOrchestrationById", id],
    () => getRequestOrchestrationById(id as string),
    {
      enabled: !!id,
    }
  );

  return { orchestration: data ?? null, isOrchestrationLoading: isLoading };
};
