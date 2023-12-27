import { App, Button, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { createMedicationRequest } from "../../../service/medicatonRequestService";
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

  const [requests, setRequests] = useState<BaseMedicationRequest[]>([]);

  const handleCreate = () => {
    createRequestOrchestration(createNewRequestOrchestration(props.caregiver))
      .then(async (r) => {
        message.success(t("translation:order.create.success", { id: r.id }));

        const promises = [...requests]
          .map((v) => ({
            ...v,
            supportingInformation: [{ reference: `RequestOrchestration/${r.id}` }],
          }))
          .map(createMedicationRequest);

        for (let i = 0; i < promises.length; i++) {
          try {
            const res = await promises[i];
            message.success(
              t("translation:order.create.successMedication", {
                name: res.medication.concept.coding[0].display,
                id: res.id,
              })
            );
          } catch (e) {
            message.error(
              t("translation:order.create.errorMedication", { name: requests[i].medication.concept.coding[0].display })
            );
          }
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
