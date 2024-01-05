import { SearchPatients } from "core/src/component/page/SearchPatients";
import { useGetCaregiverPatients } from "../../hook/useGetCaregiverPatients";

const CaregiverSearchPatients = () => {
  const { patients, isPatientsLoading } = useGetCaregiverPatients();

  return <SearchPatients patients={patients} isPatientsLoading={isPatientsLoading} showCreateButton />;
};

export default CaregiverSearchPatients;
