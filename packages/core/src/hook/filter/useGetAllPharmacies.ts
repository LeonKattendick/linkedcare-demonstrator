import { useGetAllOrganizationsByType } from "../query/useGetAllOrganizationsByType";

export const useGetAllPharmacies = () => {
  const { organizations, isOrganizationsLoading } = useGetAllOrganizationsByType("other");

  return { pharmacies: organizations, isPharmaciesLoading: isOrganizationsLoading };
};
