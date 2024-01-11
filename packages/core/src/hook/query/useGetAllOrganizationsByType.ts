import { useQuery } from "react-query";
import { getAllOrganzitationsByType } from "../../service/organizationService";

export const useGetAllOrganizationsByType = (type: "prov" | "other") => {
  const { data, isLoading } = useQuery(["useGetAllOrganizationsByType", type], () => getAllOrganzitationsByType(type));

  return { organizations: data ?? [], isOrganizationsLoading: isLoading };
};
