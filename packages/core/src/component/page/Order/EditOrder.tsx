import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMedicationRequestApiAdapter } from "../../../hook/adapter/useMedicationRequestApiAdapter";
import { useRequestOrchestrationApiAdapter } from "../../../hook/adapter/useRequestOrchestrationApiAdapter";
import { useGetAllMedicationRequestsForOrchestration } from "../../../hook/useGetAllMedicationRequestsForOrchestration";
import { usePermissions } from "../../../hook/usePermissions";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { medicationRequestsEqual } from "../../../util/matchingUtil";
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
  const { revokeOrchestrationWithInfo } = useRequestOrchestrationApiAdapter();
  const { createRequestWithInfo, editRequestWithInfo, declineRequestWithInfo } = useMedicationRequestApiAdapter();
  const { requests, isRequestsLoading } = useGetAllMedicationRequestsForOrchestration(props.order.id, props.patient.id);

  const [editRequests, setEditRequests] = useState<BaseMedicationRequest[]>([]);

  const changedRequests = editRequests.filter((v, i) => !medicationRequestsEqual(v, requests[i]));

  useEffect(() => {
    if (!isRequestsLoading) setEditRequests(requests.map((v) => structuredClone(v)));
  }, [requests]);

  const handleEdit = async () => {
    for (const request of changedRequests) {
      if (request.id) {
        await editRequestWithInfo(request);
      } else {
        await createRequestWithInfo(request);
      }
    }
  };

  const handleDecline = async () => {
    for (const request of editRequests) {
      if (perms.canDeclineMedication(request)) await declineRequestWithInfo(request, "cancelled");
    }
  };

  const handleRevoke = async () => {
    await revokeOrchestrationWithInfo(props.order);
  };

  return (
    <Space style={{ width: "100%" }} direction="vertical" size="middle">
      <MedicationTable
        requests={editRequests}
        setRequests={setEditRequests}
        patient={props.patient}
        order={props.order}
        caregiver={props.caregiver}
        doctor={props.doctor}
      />
      <Space style={{ float: "right" }}>
        {perms.canEditOrder(editRequests) && (
          <Button type="primary" disabled={changedRequests.length === 0} onClick={handleEdit}>
            {t("translation:order.buttonRow.edit", { amount: changedRequests.length })}
          </Button>
        )}
        {perms.canPrescribeOrder(editRequests) && (
          <Button type="primary">
            {t("translation:order.buttonRow.prescribe", {
              amount: editRequests.filter(perms.canPrescribeMedication).length,
            })}
          </Button>
        )}
        {perms.canCompleteOrder(editRequests) && (
          <Button type="primary">
            {t("translation:order.buttonRow.complete", {
              amount: editRequests.filter(perms.canCompleteMedication).length,
            })}
          </Button>
        )}
        {perms.canDeclineOrder(editRequests) && (
          <Button type="primary" danger onClick={handleDecline}>
            {t("translation:order.buttonRow.cancel", {
              amount: editRequests.filter(perms.canDeclineMedication).length,
            })}
          </Button>
        )}
        {perms.canBeRevoked(editRequests) && props.order.status !== "revoked" && (
          <Button type="primary" danger onClick={handleRevoke}>
            {t("translation:order.buttonRow.revoke")}
          </Button>
        )}
      </Space>
    </Space>
  );
};
