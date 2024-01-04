import { App } from "antd";
import { useTranslation } from "react-i18next";
import { BaseMedicationRequest } from "../../interface/linca/BaseMedicationRequest";
import {
  E_MED_ID_SYSTEM,
  E_REZEPT_ID_SYSTEM,
  PrescriptionMedicationRequest,
} from "../../interface/linca/PrescriptionMedicationRequest";
import { Organization } from "../../interface/linca/fhir/Organization";
import { createMedicationDispense } from "../../service/medicationDispenseService";
import { createMedicationRequest } from "../../service/medicatonRequestService";
import { createNewMedicationDispense } from "../../util/orderUtil";

export const useMedicationRequestApiAdapter = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const createRequestWithInfo = async (r: BaseMedicationRequest) => {
    try {
      const res = await createMedicationRequest(r);
      message.success(
        t("translation:order.create.successMedication", {
          name: res.medication.concept.coding[0].display,
          id: res.id,
        })
      );

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

      return res;
    } catch (e) {
      message.error(t("translation:order.edit.errorMedication", { name: r.medication.concept.coding[0].display }));
    }
  };

  const prescribeRequestWithInfo = async (
    r: BaseMedicationRequest,
    eRezeptId?: string,
    eMedId?: string,
    modificated?: boolean
  ) => {
    const isCreate = !r.id;
    const clone = structuredClone(r) as PrescriptionMedicationRequest;

    clone.id = undefined;
    clone.intent = "order";
    clone.identifier = eMedId ? [{ system: E_MED_ID_SYSTEM, value: eMedId }] : undefined;
    clone.groupIdentifier = eRezeptId ? { system: E_REZEPT_ID_SYSTEM, value: eRezeptId } : undefined;

    if (!isCreate) {
      if (modificated) clone.priorPrescription = { reference: `MedicationRequest/${r.id}` };
      else clone.basedOn = [{ reference: `MedicationRequest/${r.id}` }];
    }

    try {
      const res = await createMedicationRequest(clone);
      message.success(
        t("translation:order.prescribe.successMedication", {
          name: res.medication.concept.coding[0].display,
          id: res.id,
        })
      );

      return res;
    } catch (e) {
      message.error(t("translation:order.prescribe.errorMedication", { name: r.medication.concept.coding[0].display }));
    }
  };

  const completeRequestWithInfo = async (r: BaseMedicationRequest, pharmacy: Organization) => {
    const dispense = createNewMedicationDispense(r as PrescriptionMedicationRequest, pharmacy, false);

    try {
      const res = await createMedicationDispense(dispense);
      message.success(
        t("translation:order.complete.successMedication", {
          name: res.medication.concept.coding[0].display,
          id: res.id,
        })
      );

      return res;
    } catch (e) {
      message.error(t("translation:order.complete.errorMedication", { name: r.medication.concept.coding[0].display }));
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

      return res;
    } catch (e) {
      message.error(t("translation:order.decline.errorMedication", { name: r.medication.concept.coding[0].display }));
    }
  };

  return {
    createRequestWithInfo,
    editRequestWithInfo,
    declineRequestWithInfo,
    prescribeRequestWithInfo,
    completeRequestWithInfo,
  };
};
