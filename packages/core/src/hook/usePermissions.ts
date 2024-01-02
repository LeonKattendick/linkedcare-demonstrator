import { UserType, useUserTypeAtom } from "./useUserTypeAtom";

interface PermissionMedicineRequest {
  resourceType: "MedicationRequest";
  intent: "proposal" | "order";
  status: "active" | any;
}

export const usePermissions = () => {
  const { userType } = useUserTypeAtom();

  const canAddMedication = (r: PermissionMedicineRequest[]) => {
    if (![UserType.CAREGIVER, UserType.DOCTOR].includes(userType)) return false;
    return r.length === 0 || r.find((v) => v.intent === "proposal" && v.status === "active");
  };

  const canEditOrder = (r: PermissionMedicineRequest[]) => {
    return !!r.find(canEditMedication);
  };

  const canDeclineOrder = (r: PermissionMedicineRequest[]) => {
    return !!r.find(canDeclineMedication);
  };

  const canPrescribeOrder = (r: PermissionMedicineRequest[]) => {
    return !!r.find(canPrescribeMedication);
  };

  const canCompleteOrder = (r: PermissionMedicineRequest[]) => {
    return !!r.find(canCompleteMedication);
  };

  const canBeRevoked = (r: PermissionMedicineRequest[]) => {
    return !!r.every((v) => v.status === "cancelled");
  };

  // can be closed as soon as all requests have reached a terminal state
  const canBeClosed = (r: PermissionMedicineRequest[]) => {
    //TODO -> rest has dispense connected
    return !canBeRevoked(r) && !r.some((v) => v.status === "active");
  };

  const canEditMedication = (r: PermissionMedicineRequest) => {
    if (![UserType.CAREGIVER, UserType.DOCTOR].includes(userType)) return false;
    return r.intent === "proposal" && r.status === "active";
  };

  const canDeclineMedication = (r: PermissionMedicineRequest) => {
    if (![UserType.CAREGIVER, UserType.DOCTOR].includes(userType)) return false;
    return r.intent === "proposal" && r.status === "active";
  };

  const canPrescribeMedication = (r: PermissionMedicineRequest) => {
    if (![UserType.DOCTOR].includes(userType)) return false;
    console.log(r);
    return r.intent === "proposal" && r.status === "active";
  };

  const canCompleteMedication = (r: PermissionMedicineRequest) => {
    if (![UserType.PHARMACY].includes(userType)) return false;
    //TODO -> and has no dispense connected
    return r.intent === "order" && r.status === "active";
  };

  const canViewMedication = (r: PermissionMedicineRequest) => {
    return !canEditMedication(r);
  };

  return {
    canAddMedication,
    canEditOrder,
    canDeclineOrder,
    canPrescribeOrder,
    canCompleteOrder,
    canEditMedication,
    canDeclineMedication,
    canPrescribeMedication,
    canCompleteMedication,
    canViewMedication,
    canBeRevoked,
    canBeClosed,
  };
};
