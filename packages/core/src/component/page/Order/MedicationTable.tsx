import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { createNewProposalMedicationRequest } from "../../../util/orderUtil";
import { MedicationModal } from "./MedicationModal";

interface MedicationTableProps {
  patient: Patient;
  caregiver?: Organization;
  doctor?: Practitioner;
  requests: BaseMedicationRequest[];
  setRequests: (r: BaseMedicationRequest[]) => void;
}

export const MedicationTable = (props: MedicationTableProps) => {
  const { t } = useTranslation();

  const [editRequestIndex, setEditRequestIndex] = useState<number>(-1);
  const [editRequest, setEditRequest] = useState<BaseMedicationRequest>();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateNew = () => {
    setEditRequest(
      createNewProposalMedicationRequest(props.patient, { caregiver: props.caregiver, doctor: props.doctor })
    );
    setEditRequestIndex(-1);
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
        isCreate={editRequestIndex === -1}
        request={editRequest}
        saveRequest={handleSave}
      />
      <Table
        dataSource={props.requests}
        title={() => (
          <>
            {t("translation:order.medicationTable.title")}
            <Button
              type="primary"
              style={{ float: "right" }}
              size="small"
              icon={<PlusOutlined />}
              onClick={handleCreateNew}
            >
              {t("translation:order.medicationTable.add")}
            </Button>
          </>
        )}
        bordered
        size="small"
      >
        <Table.Column
          title={t("translation:order.medicationTable.name")}
          render={(_, record: BaseMedicationRequest) => record.medication.concept.coding[0].display}
        />
        <Table.Column
          title={t("translation:order.medicationTable.status")}
          render={(_, record: BaseMedicationRequest) => record.status}
        />
      </Table>
    </>
  );
};
