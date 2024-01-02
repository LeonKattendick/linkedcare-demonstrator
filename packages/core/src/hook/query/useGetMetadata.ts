import { useQuery } from "react-query";
import { getMetadata } from "../../service/metadataService";

export const useGetMetadata = () => {
  const { data, isSuccess } = useQuery("useGetMetadata", getMetadata);

  return { metadata: data ?? null, isMetadataSuccess: isSuccess };
};
