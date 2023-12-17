import { Button, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { MedicationTable } from "./MedicationTable";

interface EditOrderProps {
  patient: Patient;
  order: RequestOrchestration;
  caregiver?: Organization;
  doctor?: Practitioner;
}

export const EditOrder = (props: EditOrderProps) => {
  const { t } = useTranslation();

  const [order, _setOrder] = useState<RequestOrchestration>(structuredClone(props.order));
  const [requests, setRequests] = useState<BaseMedicationRequest[]>([...order.contained]);

  return (
    <Space style={{ width: "100%" }} direction="vertical" size="middle">
      <Space>
        <Button type="primary">{t("translation:order.buttonRow.edit")}</Button>
        <Button type="primary" danger>
          {t("translation:order.buttonRow.cancel")}
        </Button>
      </Space>
      <MedicationTable
        requests={requests}
        setRequests={setRequests}
        patient={props.patient}
        caregiver={props.caregiver}
        doctor={props.doctor}
      />
    </Space>
  );
};
