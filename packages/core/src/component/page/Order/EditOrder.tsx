import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetAllMedicationRequestsForOrchestration } from "../../../hook/useGetAllMedicationRequestsForOrchestration";
import { usePermissions } from "../../../hook/usePermissions";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { findMedicationRequestsErrors } from "../../../util/matchingUtil";
import { MedicationTable } from "./MedicationTable";

interface EditOrderProps {
  patient: Patient;
  order: RequestOrchestration;
  caregiver?: Organization;
  doctor?: Practitioner;
}

export const EditOrder = (props: EditOrderProps) => {
  const { t } = useTranslation();
  const perms = usePermissions();
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsForOrchestration(props.order.id, props.patient.id);

  const [editRequests, setEditRequests] = useState<BaseMedicationRequest[]>([]);

  useEffect(() => {
    if (!isRequestsLoading) setEditRequests(requests.map((v) => structuredClone(v)));
  }, [requests]);

  editRequests.forEach((v, i) => findMedicationRequestsErrors(v, requests[i]));

  return (
    <Space style={{ width: "100%" }} direction="vertical" size="middle">
      <MedicationTable
        requests={editRequests}
        setRequests={setEditRequests}
        patient={props.patient}
        caregiver={props.caregiver}
        doctor={props.doctor}
      />
      <Space style={{ float: "right" }}>
        {perms.canEditOrder(requests) && <Button type="primary">{t("translation:order.buttonRow.edit")}</Button>}
        {perms.canPrescribeOrder(requests) && (
          <Button type="primary">
            {t("translation:order.buttonRow.prescribe", {
              amount: requests.filter(perms.canPrescribeMedication).length,
            })}
          </Button>
        )}
        {perms.canCompleteOrder(requests) && (
          <Button type="primary">
            {t("translation:order.buttonRow.complete", {
              amount: requests.filter(perms.canCompleteMedication).length,
            })}
          </Button>
        )}
        {perms.canDeclineOrder(requests) && (
          <Button type="primary" danger>
            {t("translation:order.buttonRow.cancel", { amount: requests.filter(perms.canDeclineMedication).length })}
          </Button>
        )}
      </Space>
    </Space>
  );
};
