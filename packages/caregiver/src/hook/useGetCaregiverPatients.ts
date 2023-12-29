import { useGetAllPatients } from "core/src/hook/useGetAllPatients";
import { caregiverIsFromOrganization } from "core/src/util/matchingUtil";
import { useMemo } from "react";
import { useSelectedCaregiverAtom } from "./useSelectedCaregiverAtom";

export const useGetCaregiverPatients = () => {
  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { patients, isPatientsLoading } = useGetAllPatients();

  // Memoization is used to not compute this value on every rerender of the component
  const caregiverPatients = useMemo(
    () => patients.filter((v) => caregiverIsFromOrganization(selectedCaregiver, v.managingOrganization)),
    [patients, selectedCaregiver]
  );

  return {
    patients: caregiverPatients,
    isPatientsLoading,
  };
};
