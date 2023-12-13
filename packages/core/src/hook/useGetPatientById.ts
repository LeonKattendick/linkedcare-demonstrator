import { useQuery } from "react-query";
import { getPatientById } from "../service/patientService";

export const useGetPatientById = (id: string | undefined) => {
  const { data, isLoading } = useQuery(["useGetPatientById", id], () => getPatientById(id as string), {
    enabled: !!id,
  });

  return { patient: data ?? null, isPatientLoading: isLoading };
};
