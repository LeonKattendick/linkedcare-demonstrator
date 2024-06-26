import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";
import { MedicationDispense } from "../interface/linca/MedicationDispense";
import { Organization } from "../interface/linca/fhir/Organization";
import { Practitioner } from "../interface/linca/fhir/Practitioner";
import { identifierEqualsReference, isAuthorizingPrescription } from "../util/matchingUtil";
import { UserType, useUserTypeAtom } from "./useUserTypeAtom";

interface PermissionMedicineRequest {
  resourceType: "MedicationRequest";
  id?: string;
  intent: "proposal" | "order";
  status: "active" | string;
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

  const canCompleteOrder = (r: PermissionMedicineRequest[], d: MedicationDispense[]) => {
    return !!r.find((v) => canCompleteMedication(v, d));
  };

  const canBeRevoked = (r: PermissionMedicineRequest[]) => {
    if (![UserType.CAREGIVER].includes(userType)) return false;
    return !!r.every((v) => v.status === "cancelled");
  };

  // can be closed as soon as all requests have reached a terminal state
  const canBeClosed = (r: PermissionMedicineRequest[], d: MedicationDispense[]) => {
    if (![UserType.CAREGIVER].includes(userType)) return false;
    return !canBeRevoked(r) && !r.some((v) => v.status === "active" && !d.find((w) => isAuthorizingPrescription(w, v)));
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

  const canCompleteMedication = (r: PermissionMedicineRequest, d: MedicationDispense[]) => {
    if (![UserType.PHARMACY].includes(userType)) return false;
    if (d.find((v) => isAuthorizingPrescription(v, r) && v.type.coding[0].code === "FFC")) {
      return false;
    }
    return r.intent === "order" && r.status === "active";
  };

  const canViewMedication = (r: PermissionMedicineRequest) => {
    return !canEditMedication(r);
  };

  const canDoctorSeeRequest = (r: BaseMedicationRequest, doctor: Practitioner | null) => {
    if (!doctor) return false;
    return identifierEqualsReference(doctor.identifier[0], r.performer[0]);
  };

  const canPharmacySeeRequest = (r: BaseMedicationRequest, pharmacy: Organization | null) => {
    if (!pharmacy) return false;
    if (["ended", "stopped", "entered-in-error", "cancelled"].includes(r.status)) return false;
    return !r.dispenseRequest || identifierEqualsReference(pharmacy.identifier[0], r.dispenseRequest?.dispenser);
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
    canDoctorSeeRequest,
    canPharmacySeeRequest,
  };
};
