import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMedicationRequestApiAdapter } from "../../../hook/adapter/useMedicationRequestApiAdapter";
import { useRequestOrchestrationApiAdapter } from "../../../hook/adapter/useRequestOrchestrationApiAdapter";
import { useGetAllMedicationRequestsByPatient } from "../../../hook/query/useGetAllMedicationRequestsByPatient";
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
import { PrescribeModal } from "./PrescribeModal";

interface EditOrderProps {
  patient: Patient;
  order: RequestOrchestration;
  requests: BaseMedicationRequest[];
  caregiver?: Organization;
  doctor?: Practitioner;
  pharmacy?: Organization;
}

export const EditOrder = (props: EditOrderProps) => {
  const { t } = useTranslation();
  const perms = usePermissions();
  const { userType } = useUserTypeAtom();

  const { revokeOrchestrationWithInfo, completeOrchestrationWithInfo } = useRequestOrchestrationApiAdapter();
  const requestApi = useMedicationRequestApiAdapter();

  const { invalidateAllMedicationRequests } = useGetAllMedicationRequestsByPatient();

  const [editRequests, setEditRequests] = useState<BaseMedicationRequest[]>([]);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [prescribeModalOpen, setPrescribeModalOpen] = useState(false);

  const changedRequests = editRequests.filter((v, i) => !medicationRequestsEqual(v, props.requests[i]));
  const declineRequests = editRequests.filter((v) => !!v.id);
  const prescribeRequests = editRequests.filter(perms.canPrescribeMedication);

  const completeAmount = editRequests.filter(perms.canCompleteMedication).length;
  const declineAmount = editRequests.filter(perms.canDeclineMedication).length;

  useEffect(() => {
    setEditRequests(props.requests.map((v) => structuredClone(v)));
  }, [props.requests]);

  const handleEdit = async () => {
    for (const request of changedRequests) {
      if (request.id) {
        await requestApi.editRequestWithInfo(request);
      } else {
        await requestApi.createRequestWithInfo(request);
      }
    }
    invalidateAllMedicationRequests();
  };

  const handlePrescribe = () => {
    setPrescribeModalOpen(true);
  };

  const handleComplete = async () => {
    for (const request of editRequests) {
      if (perms.canCompleteMedication(request)) await requestApi.completeRequestWithInfo(request);
    }
    invalidateAllMedicationRequests();
  };

  const handleDecline = async () => {
    if (userType === UserType.CAREGIVER) {
      for (const request of declineRequests) {
        if (perms.canDeclineMedication(request)) await requestApi.declineRequestWithInfo(request, "cancelled");
      }
      invalidateAllMedicationRequests();
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
      <PrescribeModal open={prescribeModalOpen} setOpen={setPrescribeModalOpen} requests={prescribeRequests} />
      <Space style={{ width: "100%" }} direction="vertical" size="middle">
        <MedicationTable
          requests={editRequests}
          setRequests={setEditRequests}
          patient={props.patient}
          order={props.order}
          caregiver={props.caregiver}
          doctor={props.doctor}
          pharmacy={props.pharmacy}
        />
        <Space style={{ float: "right" }}>
          {perms.canEditOrder(editRequests) && (
            <Button type="primary" disabled={changedRequests.length === 0} onClick={handleEdit} icon={<EditOutlined />}>
              {t("translation:order.buttonRow.edit", { amount: changedRequests.length })}
            </Button>
          )}
          {perms.canPrescribeOrder(editRequests) && (
            <Popconfirm
              title={t("translation:order.buttonRow.popconfirm.prescribe", { amount: prescribeRequests.length })}
              onConfirm={handlePrescribe}
              okText={t("translation:general.yes")}
              arrow={{ pointAtCenter: true }}
            >
              <Button type="primary" icon={<CheckOutlined />}>
                {t("translation:order.buttonRow.prescribe", {
                  amount: prescribeRequests.length,
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
