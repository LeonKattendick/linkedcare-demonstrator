import { useQuery } from "react-query";
import { getAllPatients } from "../service/patientService";

export const useGetAllPatients = () => {
  const { data, isLoading } = useQuery("useGetAllPatients", getAllPatients);

  return { patients: data ?? [], isPatientsLoading: isLoading };
};
