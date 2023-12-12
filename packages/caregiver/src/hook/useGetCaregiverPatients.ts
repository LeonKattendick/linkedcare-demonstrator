import { useGetAllPatients } from "core/src/hook/useGetAllPatients";
import { organizationEqualsReference } from "core/src/util/matchingUtil";
import { useSelectedCaregiverAtom } from "./useSelectedCaregiverAtom";

export const useGetCaregiverPatients = () => {
  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { patients, isPatientsLoading } = useGetAllPatients();

  return {
    patients: patients.filter((v) => organizationEqualsReference(selectedCaregiver, v.managingOrganization)),
    isPatientsLoading,
  };
};
