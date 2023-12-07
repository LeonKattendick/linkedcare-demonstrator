import { useQuery } from "react-query";
import { getAllPatients } from "../service/patientService";

export const useGetAllPatients = () => {
  const { data } = useQuery("useGetAllPatients", getAllPatients);

  return { patients: data ?? [] };
};
