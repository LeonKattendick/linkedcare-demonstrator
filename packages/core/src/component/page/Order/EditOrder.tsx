import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";
import { useGetAllValidMedicationRequestsForOrchestration } from "core/src/hook/useGetAllValidMedicationRequestsForOrchestration";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMedicationRequestApiAdapter } from "../../../hook/adapter/useMedicationRequestApiAdapter";
import { useRequestOrchestrationApiAdapter } from "../../../hook/adapter/useRequestOrchestrationApiAdapter";
import { useGetAllMedicationRequestsByPatient } from "../../../hook/useGetAllMedicationRequestsByPatient";
import { usePermissions } from "../../../hook/usePermissions";
import { UserType, useUserTypeAtom } from "../../../hook/useUserTypeAtom";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { medicationRequestsEqual } from "../../../util/matchingUtil";
import { DeclineStatusModal } from "./DeclineStatusModal";
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
  const { userType } = useUserTypeAtom();

  const { revokeOrchestrationWithInfo, completeOrchestrationWithInfo } = useRequestOrchestrationApiAdapter();
  const requestApi = useMedicationRequestApiAdapter();

  const { requests, isRequestsLoading } = useGetAllValidMedicationRequestsForOrchestration(
    props.order.id,
    props.patient.id
  );
  const { invalidateAllMedicationRequestsByPatient } = useGetAllMedicationRequestsByPatient();

  const [editRequests, setEditRequests] = useState<BaseMedicationRequest[]>([]);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);

  const changedRequests = editRequests.filter((v, i) => !medicationRequestsEqual(v, requests[i]));
  const declineRequests = editRequests.filter((v) => !!v.id);

  const prescribeAmount = editRequests.filter(perms.canPrescribeMedication).length;
  const completeAmount = editRequests.filter(perms.canCompleteMedication).length;
  const declineAmount = editRequests.filter(perms.canDeclineMedication).length;

  useEffect(() => {
    if (!isRequestsLoading) setEditRequests(requests.map((v) => structuredClone(v)));
  }, [requests]);

  const handleEdit = async () => {
    for (const request of changedRequests) {
      if (request.id) {
        await requestApi.editRequestWithInfo(request);
      } else {
        await requestApi.createRequestWithInfo(request);
      }
    }
    invalidateAllMedicationRequestsByPatient();
  };

  const handlePrescribe = async () => {
    for (const request of editRequests) {
      if (perms.canPrescribeMedication(request)) await requestApi.prescribeRequestWithInfo(request);
    }
    invalidateAllMedicationRequestsByPatient();
  };

  const handleComplete = async () => {
    for (const request of editRequests) {
      if (perms.canCompleteMedication(request)) await requestApi.completeRequestWithInfo(request);
    }
    invalidateAllMedicationRequestsByPatient();
  };

  const handleDecline = async () => {
    if (userType === UserType.CAREGIVER) {
      for (const request of declineRequests) {
        if (perms.canDeclineMedication(request)) await requestApi.declineRequestWithInfo(request, "cancelled");
      }
      invalidateAllMedicationRequestsByPatient();
    } else {
      setDeclineModalOpen(true);
    }
  };

  const handleRevoke = async () => {
    await revokeOrchestrationWithInfo(props.order);
  };

  const handleClose = async () => {
    await completeOrchestrationWithInfo(props.order);
  };

  return (
    <>
      <DeclineStatusModal open={declineModalOpen} setOpen={setDeclineModalOpen} requests={declineRequests} />
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
            <Button type="primary" disabled={changedRequests.length === 0} onClick={handleEdit} icon={<EditOutlined />}>
              {t("translation:order.buttonRow.edit", { amount: changedRequests.length })}
            </Button>
          )}
          {perms.canPrescribeOrder(editRequests) && (
            <Popconfirm
              title={t("translation:order.buttonRow.popconfirm.prescribe", { amount: prescribeAmount })}
              onConfirm={handlePrescribe}
              okText={t("translation:general.yes")}
              arrow={{ pointAtCenter: true }}
            >
              <Button type="primary" icon={<CheckOutlined />}>
                {t("translation:order.buttonRow.prescribe", {
                  amount: prescribeAmount,
                })}
              </Button>
            </Popconfirm>
          )}
          {perms.canCompleteOrder(editRequests) && (
            <Popconfirm
              title={t("translation:order.buttonRow.popconfirm.complete", { amount: completeAmount })}
              onConfirm={handleComplete}
              okText={t("translation:general.yes")}
              arrow={{ pointAtCenter: true }}
            >
              <Button type="primary" icon={<CheckOutlined />}>
                {t("translation:order.buttonRow.complete", {
                  amount: completeAmount,
                })}
              </Button>
            </Popconfirm>
          )}
          {perms.canDeclineOrder(editRequests) && (
            <Popconfirm
              title={t("translation:order.buttonRow.popconfirm.decline", { amount: declineAmount })}
              onConfirm={handleDecline}
              placement="topRight"
              okText={t("translation:general.yes")}
              arrow={{ pointAtCenter: true }}
            >
              <Button type="primary" danger icon={<DeleteOutlined />}>
                {t("translation:order.buttonRow.decline", {
                  amount: declineAmount,
                })}
              </Button>
            </Popconfirm>
          )}
          {perms.canBeRevoked(editRequests) && props.order.status !== "revoked" && (
            <Button type="primary" danger onClick={handleRevoke}>
              {t("translation:order.buttonRow.revoke")}
            </Button>
          )}
          {perms.canBeClosed(editRequests) && props.order.status !== "completed" && (
            <Button type="primary" onClick={handleClose}>
              {t("translation:order.buttonRow.close")}
            </Button>
          )}
        </Space>
      </Space>
    </>
  );
};
