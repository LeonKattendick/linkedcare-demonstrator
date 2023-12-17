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

  const [editRequest, setEditRequest] = useState<BaseMedicationRequest>();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateNew = () => {
    setEditRequest(
      createNewProposalMedicationRequest(props.patient, { caregiver: props.caregiver, doctor: props.doctor })
    );
    setModalOpen(true);
  };

  return (
    <>
      <MedicationModal open={modalOpen} setOpen={setModalOpen} request={editRequest} setRequest={setEditRequest} />
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
      />
    </>
  );
};
