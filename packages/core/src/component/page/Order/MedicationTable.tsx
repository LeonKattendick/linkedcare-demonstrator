import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MedicineBoxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePermissions } from "../../../hook/usePermissions";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { ExternalReference } from "../../../interface/linca/fhir/Reference";
import { createNewProposalMedicationRequest } from "../../../util/orderUtil";
import { MedicationModal, MedicationModalState } from "./MedicationModal";

interface MedicationTableProps {
  patient: Patient;
  caregiver?: Organization;
  doctor?: Practitioner;
  order?: RequestOrchestration;
  requests: BaseMedicationRequest[];
  setRequests: (r: BaseMedicationRequest[]) => void;
}

export const MedicationTable = (props: MedicationTableProps) => {
  const { t } = useTranslation();
  const perms = usePermissions();

  const [editRequestIndex, setEditRequestIndex] = useState<MedicationModalState | number>(MedicationModalState.CREATE);
  const [editRequest, setEditRequest] = useState<BaseMedicationRequest>();
  const [modalOpen, setModalOpen] = useState(false);

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
          title={t("translation:order.medicationTable.name")}
          render={(_, record: BaseMedicationRequest) => record.medication.concept.coding[0].display}
        />
        <Table.Column
          title={t("translation:order.medicationTable.status")}
          render={(_, record: BaseMedicationRequest) => record.status}
        />
        <Table.Column
          title={t("translation:order.medicationTable.doctor")}
          render={(_, record: BaseMedicationRequest) => (record.performer[0] as ExternalReference).display}
        />
        <Table.Column
          title={t("translation:order.medicationTable.pharmacy")}
          render={(_, record: BaseMedicationRequest) =>
            (record.dispenseRequest?.dispenser as ExternalReference)?.display
          }
        />
        <Table.Column
          title={t("translation:order.medicationTable.dosage")}
          render={(_, record: BaseMedicationRequest) => record.dosageInstruction.length}
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
              {perms.canPrescribeMedication(record) && <Button type="primary" icon={<CheckOutlined />} size="small" />}
              {perms.canCompleteMedication(record) && (
                <Button type="primary" icon={<MedicineBoxOutlined />} size="small" />
              )}
              {perms.canDeclineMedication(record) && (
                <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
              )}
            </Space>
          )}
        />
      </Table>
    </>
  );
};
