import { SearchPatients } from "core/src/component/page/SearchPatients";
import { useGetCaregiverPatients } from "../../hook/useGetCaregiverPatients";

export const CaregiverSearchPatients = () => {
  const { patients, isPatientsLoading } = useGetCaregiverPatients();

  return <SearchPatients patients={patients} isPatientsLoading={isPatientsLoading} showCreateButton />;
};
