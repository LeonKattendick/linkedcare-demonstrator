import { App } from "antd";
import { useTranslation } from "react-i18next";
import { BaseMedicationRequest } from "../interface/linca/BaseMedicationRequest";
import { PrescriptionMedicationRequest } from "../interface/linca/PrescriptionMedicationRequest";
import { createMedicationRequest } from "../service/medicatonRequestService";
import { useGetAllMedicationRequestsByPatient } from "./useGetAllMedicationRequestsByPatient";

export const useMedicationRequestApiAdapter = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { invalidateEveryGetAllMedicationRequestsByPatient } = useGetAllMedicationRequestsByPatient();

  const createRequestWithInfo = async (r: BaseMedicationRequest) => {
    try {
      const res = await createMedicationRequest(r);
      message.success(
        t("translation:order.create.successMedication", {
          name: res.medication.concept.coding[0].display,
          id: res.id,
        })
      );
      invalidateEveryGetAllMedicationRequestsByPatient();
      return res;
    } catch (e) {
      message.error(t("translation:order.create.errorMedication", { name: r.medication.concept.coding[0].display }));
    }
  };

  const editRequestWithInfo = async (r: BaseMedicationRequest) => {
    const clone = structuredClone(r);

    clone.id = undefined;
    (clone as PrescriptionMedicationRequest).priorPrescription = undefined;
    clone.basedOn = [{ reference: `MedicationRequest/${r.id}` }];

    try {
      const res = await createMedicationRequest(clone);
      message.success(
        t("translation:order.edit.successMedication", {
          name: res.medication.concept.coding[0].display,
          id: res.id,
        })
      );
      invalidateEveryGetAllMedicationRequestsByPatient();
      return res;
    } catch (e) {
      message.error(t("translation:order.edit.errorMedication", { name: r.medication.concept.coding[0].display }));
    }
  };

  const declineRequestWithInfo = async (
    r: BaseMedicationRequest,
    status: "cancelled" | "ended" | "stopped" | "entered-in-error"
  ) => {
    const clone = structuredClone(r);

    clone.id = undefined;
    (clone as PrescriptionMedicationRequest).priorPrescription = undefined;
    clone.basedOn = [{ reference: `MedicationRequest/${r.id}` }];
    clone.status = status;

    try {
      const res = await createMedicationRequest(clone);
      message.success(
        t("translation:order.decline.successMedication", {
          name: res.medication.concept.coding[0].display,
          id: res.id,
        })
      );
      invalidateEveryGetAllMedicationRequestsByPatient();
      return res;
    } catch (e) {
      message.error(t("translation:order.decline.errorMedication", { name: r.medication.concept.coding[0].display }));
    }
  };

  return { createRequestWithInfo, editRequestWithInfo, declineRequestWithInfo };
};
