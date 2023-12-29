import { SearchPatients } from "core/src/component/page/SearchPatients";
import { useGetAllPatients } from "core/src/hook/useGetAllPatients";

export const DoctorSearchPatients = () => {
  const { patients, isPatientsLoading } = useGetAllPatients();

  return <SearchPatients patients={patients} isPatientsLoading={isPatientsLoading} />;
};
