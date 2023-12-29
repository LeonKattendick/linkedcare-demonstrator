import { App, Button, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useMedicationRequestApiAdapter } from "../../../hook/useMedicationRequestApiAdapter";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { createRequestOrchestration } from "../../../service/requestOrchestrationService";
import { createNewRequestOrchestration } from "../../../util/orderUtil";
import { MedicationTable } from "./MedicationTable";

interface CreateOrderProps {
  patient: Patient;
  caregiver: Organization;
}

export const CreateOrder = (props: CreateOrderProps) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { createRequestWithInfo } = useMedicationRequestApiAdapter();

  const [requests, setRequests] = useState<BaseMedicationRequest[]>([]);

  const handleCreate = () => {
    createRequestOrchestration(createNewRequestOrchestration(props.caregiver))
      .then(async (r) => {
        message.success(t("translation:order.create.success", { id: r.id }));

        const requestsWithId = requests.map((v) => ({
          ...v,
          supportingInformation: [{ reference: `RequestOrchestration/${r.id}` }],
        }));

        for (const request of requestsWithId) {
          await createRequestWithInfo(request);
        }
        navigate(`/order/${props.patient.id}/${r.id}`);
      })
      .catch(() => message.error(t("translation:order.create.error")));
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
