import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MedicineBoxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMedicationRequestApiAdapter } from "../../../hook/adapter/useMedicationRequestApiAdapter";
import { useGetAllMedicationDispensesByPatientAndRequests } from "../../../hook/filter/useGetAllMedicationDispensesByPatientAndRequests";
import { useGetAllPractitioners } from "../../../hook/query/useGetAllPractitioners";
import { usePermissions } from "../../../hook/usePermissions";
import { useQueryInvalidations } from "../../../hook/useQueryInvalidations";
import { UserType, useUserTypeAtom } from "../../../hook/useUserTypeAtom";
import { MedicationModalState } from "../../../interface/enum/MedicationModalState";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { PrescriptionMedicationRequest } from "../../../interface/linca/PrescriptionMedicationRequest";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { ExternalReference } from "../../../interface/linca/fhir/Reference";
import { hasMedId, hasRezeptId, isAuthorizingPrescription } from "../../../util/matchingUtil";
import { isPrescribed } from "../../../util/medicationRequestUtil";
import { createNewProposalMedicationRequest } from "../../../util/orderUtil";
import { renderDosage } from "../../../util/renderUtil";
import { DeclineStatusModal } from "./DeclineStatusModal";
import { MedicationModal } from "./MedicationModal";
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

  const { practitioners } = useGetAllPractitioners();
  const { invalidateAllMedicationRequests, invalidateAllMedicationDispenses } = useQueryInvalidations();
  const { dispenses } = useGetAllMedicationDispensesByPatientAndRequests(props.patient.id, props.requests);

  const [editRequestIndex, setEditRequestIndex] = useState<MedicationModalState | number>(MedicationModalState.CREATE);
  const [editRequest, setEditRequest] = useState<BaseMedicationRequest>();
  const [modalOpen, setModalOpen] = useState(false);

  const [declineRequestIndex, setDeclineRequestIndex] = useState<number>();
  const [declineModalOpen, setDeclineModalOpen] = useState(false);

  const [prescribeRequestIndex, setPrescribeRequestIndex] = useState<number>();
  const [prescribeModalOpen, setPrescribeModalOpen] = useState(false);

  const handleCreate = () => {
    if (practitioners.length === 0) {
      console.error("Practitioners not loaded or empty!");
      return;
    }

    setEditRequestIndex(MedicationModalState.CREATE);
    setEditRequest(
      createNewProposalMedicationRequest(
        props.patient,
        practitioners[0],
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
    await requestApi.completeRequestWithInfo(props.requests[index], props.pharmacy!);
    invalidateAllMedicationDispenses();
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
        patient={props.patient}
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
          render={(_, record: BaseMedicationRequest) => {
            const dispense = dispenses.find((v) => isAuthorizingPrescription(v, record));
            if (dispense) return t(`translation:order.medicationTable.state.${dispense.status}`);

            return (
              <Tooltip title={`FHIR Status: ${record.status} (${record.intent})`}>
                {t(`translation:order.medicationTable.state.${record.status}`)} (
                {t(`translation:order.medicationTable.state.${record.intent}`)})
              </Tooltip>
            );
          }}
          sorter={(a, b) => `${a.status} (${a.intent})`.localeCompare(`${b.status} (${b.intent})`)}
        />
        {!!props.requests.find(hasRezeptId) && (
          <Table.Column
            title={t("translation:order.medicationTable.modal.table.eRezeptId")}
            render={(_, record: BaseMedicationRequest) => {
              if (!isPrescribed(record)) return null;
              const prescribed = record as PrescriptionMedicationRequest;
              return prescribed.groupIdentifier?.value;
            }}
          />
        )}
        {!!props.requests.find(hasMedId) && (
          <Table.Column
            title={t("translation:order.medicationTable.modal.table.eMedId")}
            render={(_, record: BaseMedicationRequest) => {
              if (!isPrescribed(record)) return null;
              const prescribed = record as PrescriptionMedicationRequest;
              return prescribed.identifier?.[0].value;
            }}
          />
        )}
        <Table.Column
          title={t("translation:order.medicationTable.doctor")}
          render={(_, record: BaseMedicationRequest) => (record.performer[0] as ExternalReference).display}
          sorter={(a, b) =>
            (a.performer[0] as ExternalReference).display.localeCompare((b.performer[0] as ExternalReference).display)
          }
        />
        <Table.Column
          title={t("translation:order.medicationTable.pharmacy")}
          render={(_, record: BaseMedicationRequest) => {
            const dispense = dispenses.find((v) => isAuthorizingPrescription(v, record));
            if (dispense) return (dispense.performer[0].actor as ExternalReference).display;

            return (record.dispenseRequest?.dispenser as ExternalReference)?.display;
          }}
          sorter={(a, b) =>
            (a.dispenseRequest?.dispenser as ExternalReference)?.display.localeCompare(
              (b.dispenseRequest?.dispenser as ExternalReference)?.display
            )
          }
        />
        <Table.Column
          title={t("translation:order.medicationTable.dosage")}
          render={(_, record: BaseMedicationRequest) => renderDosage(record.dosageInstruction, t)}
          sorter={(a, b) => renderDosage(a.dosageInstruction, t).localeCompare(renderDosage(b.dosageInstruction, t))}
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
              {perms.canCompleteMedication(record, dispenses) && (
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
