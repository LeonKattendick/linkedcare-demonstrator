import { useGetAllOrganizationsByType } from "../query/useGetAllOrganizationsByType";

export const useGetAllCaregivers = () => {
  const { organizations, isOrganizationsLoading } = useGetAllOrganizationsByType("prov");

  return { caregivers: organizations, isCaregiversLoading: isOrganizationsLoading };
};
