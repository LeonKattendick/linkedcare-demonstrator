import { Button, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { createNewRequestOrchestration } from "../../../util/orderUtil";
import { MedicationTable } from "./MedicationTable";

interface CreateOrderProps {
  patient: Patient;
  caregiver: Organization;
}

export const CreateOrder = (props: CreateOrderProps) => {
  const { t } = useTranslation();

  const [order, setOrder] = useState<RequestOrchestration>(createNewRequestOrchestration(props.caregiver));

  const setRequests = (r: BaseMedicationRequest[]) => {
    setOrder({ ...order, contained: r });
  };

  return (
    <Space style={{ width: "100%" }} direction="vertical" size="middle">
      <MedicationTable
        requests={order.contained}
        setRequests={setRequests}
        patient={props.patient}
        caregiver={props.caregiver}
      />
      <Space style={{ float: "right" }}>
        <Button type="primary" disabled={order.contained.length === 0}>
          {t("translation:order.buttonRow.create")}
        </Button>
      </Space>
    </Space>
  );
};
