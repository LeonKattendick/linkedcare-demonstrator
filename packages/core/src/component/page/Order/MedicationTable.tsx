import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MedicineBoxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMedicationRequestApiAdapter } from "../../../hook/adapter/useMedicationRequestApiAdapter";
import { useGetAllMedicationRequestsByPatient } from "../../../hook/query/useGetAllMedicationRequestsByPatient";
import { usePermissions } from "../../../hook/usePermissions";
import { UserType, useUserTypeAtom } from "../../../hook/useUserTypeAtom";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { ExternalReference } from "../../../interface/linca/fhir/Reference";
import { createNewProposalMedicationRequest } from "../../../util/orderUtil";
import { DeclineStatusModal } from "./DeclineStatusModal";
import { MedicationModal, MedicationModalState } from "./MedicationModal";
import { PrescribeModal } from "./PrescribeModal";

interface MedicationTableProps {
  patient: Patient;
  caregiver?: Organization;
  doctor?: Practitioner;
  pharmacy?: Organization;
  order?: RequestOrchestration;
  requests: BaseMedicationRequest[];
  setRequests: (r: BaseMedicationRequest[]) => void;
}

export const MedicationTable = (props: MedicationTableProps) => {
  const { t } = useTranslation();
  const perms = usePermissions();
  const { userType } = useUserTypeAtom();
  const requestApi = useMedicationRequestApiAdapter();
  const { invalidateAllMedicationRequests } = useGetAllMedicationRequestsByPatient();

  const [editRequestIndex, setEditRequestIndex] = useState<MedicationModalState | number>(MedicationModalState.CREATE);
  const [editRequest, setEditRequest] = useState<BaseMedicationRequest>();
  const [modalOpen, setModalOpen] = useState(false);

  const [declineRequestIndex, setDeclineRequestIndex] = useState<number>();
  const [declineModalOpen, setDeclineModalOpen] = useState(false);

  const [prescribeRequestIndex, setPrescribeRequestIndex] = useState<number>();
  const [prescribeModalOpen, setPrescribeModalOpen] = useState(false);

  const handleCreate = () => {
    setEditRequestIndex(MedicationModalState.CREATE);
    setEditRequest(
      createNewProposalMedicationRequest(
        props.patient,
        { caregiver: props.caregiver, doctor: props.doctor },
        props.order
      )
    );
    setModalOpen(true);
  };

  const handleView = (index: number) => {
    setEditRequestIndex(MedicationModalState.VIEW);
    setEditRequest(structuredClone(props.requests[index]));
    setModalOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditRequestIndex(index);
    setEditRequest(structuredClone(props.requests[index]));
    setModalOpen(true);
  };

  const handlePrescribe = async (index: number) => {
    setPrescribeRequestIndex(index);
    setPrescribeModalOpen(true);
  };

  const handleComplete = async (index: number) => {
    await requestApi.completeRequestWithInfo(props.requests[index]);
    invalidateAllMedicationRequests();
  };

  const handleDecline = async (index: number) => {
    if (!props.requests[index].id) {
      props.setRequests([...props.requests].filter((_, i) => i !== index));
      return;
    }

    if (userType === UserType.CAREGIVER) {
      await requestApi.declineRequestWithInfo(props.requests[index], "cancelled");
      invalidateAllMedicationRequests();
    } else {
      setDeclineRequestIndex(index);
      setDeclineModalOpen(true);
    }
  };

  const handleSave = (r: BaseMedicationRequest) => {
    if (editRequestIndex === -1) {
      props.setRequests([...props.requests, r]);
    } else {
      const temp = [...props.requests];
      temp[editRequestIndex] = r;
      props.setRequests(temp);
    }
  };

  return (
    <>
      <MedicationModal
        open={modalOpen}
        setOpen={setModalOpen}
        state={
          editRequestIndex === MedicationModalState.VIEW
            ? MedicationModalState.VIEW
            : editRequestIndex === MedicationModalState.CREATE
            ? MedicationModalState.CREATE
            : MedicationModalState.EDIT
        }
        request={editRequest}
        saveRequest={handleSave}
      />
      <DeclineStatusModal
        open={declineModalOpen}
        setOpen={setDeclineModalOpen}
        requests={props.requests.filter((_, i) => i === declineRequestIndex)}
      />
      <PrescribeModal
        open={prescribeModalOpen}
        setOpen={setPrescribeModalOpen}
        requests={props.requests.filter((_, i) => i === prescribeRequestIndex)}
      />
      <Table
        dataSource={props.requests}
        rowKey={(v) => v.id!}
        title={() => (
          <>
            {t("translation:order.medicationTable.title")}
            {perms.canAddMedication(props.requests) && (
              <Button
                type="primary"
                style={{ float: "right" }}
                size="small"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                {t("translation:order.medicationTable.add")}
              </Button>
            )}
          </>
        )}
        bordered
        size="small"
        pagination={false}
      >
        <Table.Column
          title="#"
          dataIndex="id"
          sorter={(a: BaseMedicationRequest, b: BaseMedicationRequest) => (a.id?.localeCompare(b.id ?? "") ? 1 : -1)}
        />
        <Table.Column
          title={t("translation:order.medicationTable.name")}
          render={(_, record: BaseMedicationRequest) => record.medication.concept.coding[0].display}
          sorter={(a, b) =>
            a.medication.concept.coding[0].display.localeCompare(b.medication.concept.coding[0].display)
          }
        />
        <Table.Column
          title={t("translation:order.medicationTable.status")}
          render={(_, record: BaseMedicationRequest) => (
            <>
              {record.status} ({record.intent})
            </>
          )}
          sorter={(a, b) => `${a.status} (${a.intent})`.localeCompare(`${b.status} (${b.intent})`)}
        />
        <Table.Column
          title={t("translation:order.medicationTable.doctor")}
          render={(_, record: BaseMedicationRequest) => (record.performer[0] as ExternalReference).display}
          sorter={(a, b) =>
            (a.performer[0] as ExternalReference).display.localeCompare((b.performer[0] as ExternalReference).display)
          }
        />
        <Table.Column
          title={t("translation:order.medicationTable.pharmacy")}
          render={(_, record: BaseMedicationRequest) =>
            (record.dispenseRequest?.dispenser as ExternalReference)?.display
          }
          sorter={(a, b) =>
            (a.dispenseRequest?.dispenser as ExternalReference)?.display.localeCompare(
              (b.dispenseRequest?.dispenser as ExternalReference)?.display
            )
          }
        />
        <Table.Column
          title={t("translation:order.medicationTable.dosage")}
          render={(_, record: BaseMedicationRequest) => record.dosageInstruction.length}
          sorter={(a, b) => b.dosageInstruction.length - a.dosageInstruction.length}
        />
        <Table.Column
          title={t("translation:general.actions")}
          render={(_, record: BaseMedicationRequest, index) => (
            <Space>
              {perms.canViewMedication(record) && (
                <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleView(index)} />
              )}
              {perms.canEditMedication(record) && (
                <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => handleEdit(index)} />
              )}
              {perms.canPrescribeMedication(record) && (
                <Button type="primary" icon={<CheckOutlined />} size="small" onClick={() => handlePrescribe(index)} />
              )}
              {perms.canCompleteMedication(record) && (
                <Popconfirm
                  title={t("translation:order.medicationTable.popconfirm.complete")}
                  onConfirm={() => handleComplete(index)}
                  icon={<MedicineBoxOutlined />}
                  placement="topRight"
                  okText={t("translation:general.yes")}
                  arrow={{ pointAtCenter: true }}
                >
                  <Button type="primary" icon={<MedicineBoxOutlined />} size="small" />
                </Popconfirm>
              )}
              {perms.canDeclineMedication(record) && (
                <Popconfirm
                  title={t("translation:order.medicationTable.popconfirm.decline")}
                  onConfirm={() => handleDecline(index)}
                  disabled={userType !== UserType.CAREGIVER || !props.requests[index].id}
                  placement="topRight"
                  okText={t("translation:general.yes")}
                  arrow={{ pointAtCenter: true }}
                >
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={() =>
                      (userType !== UserType.CAREGIVER || !props.requests[index].id) && handleDecline(index)
                    }
                  />
                </Popconfirm>
              )}
            </Space>
          )}
        />
      </Table>
    </>
  );
};
