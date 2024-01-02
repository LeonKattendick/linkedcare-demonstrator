import { Button, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useMedicationRequestApiAdapter } from "../../../hook/adapter/useMedicationRequestApiAdapter";
import { useRequestOrchestrationApiAdapter } from "../../../hook/adapter/useRequestOrchestrationApiAdapter";
import { useGetAllMedicationRequestsByPatient } from "../../../hook/useGetAllMedicationRequestsByPatient";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { createNewRequestOrchestration } from "../../../util/orderUtil";
import { MedicationTable } from "./MedicationTable";

interface CreateOrderProps {
  patient: Patient;
  caregiver: Organization;
}

export const CreateOrder = (props: CreateOrderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createOrchestrationWithInfo } = useRequestOrchestrationApiAdapter();
  const { createRequestWithInfo } = useMedicationRequestApiAdapter();
  const { invalidateAllMedicationRequestsByPatient } = useGetAllMedicationRequestsByPatient();

  const [requests, setRequests] = useState<BaseMedicationRequest[]>([]);

  const handleCreate = async () => {
    const res = await createOrchestrationWithInfo(createNewRequestOrchestration(props.caregiver));
    if (!res) return;

    const requestsWithId = requests.map((v) => ({
      ...v,
      supportingInformation: [{ reference: `RequestOrchestration/${res.id}` }],
    }));

    for (const request of requestsWithId) {
      await createRequestWithInfo(request);
    }

    invalidateAllMedicationRequestsByPatient();
    navigate(`/order/${props.patient.id}/${res.id}`);
  };

  return (
    <Space style={{ width: "100%" }} direction="vertical" size="middle">
      <MedicationTable
        requests={requests}
        setRequests={setRequests}
        patient={props.patient}
        caregiver={props.caregiver}
      />
      <Space style={{ float: "right" }}>
        <Button type="primary" disabled={requests.length === 0} onClick={handleCreate}>
          {t("translation:order.buttonRow.create")}
        </Button>
      </Space>
    </Space>
  );
};
