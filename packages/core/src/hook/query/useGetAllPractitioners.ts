import { useQuery } from "react-query";
import { getAllPractitioners } from "../../service/practitionerService";

export const useGetAllPractitioners = () => {
  const { data, isLoading } = useQuery("useGetAllPractitioners", getAllPractitioners);

  return { practitioners: data ?? [], isPractitionersLoading: isLoading };
};
