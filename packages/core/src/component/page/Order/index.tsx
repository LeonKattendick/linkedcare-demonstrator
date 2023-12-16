import { Card, Flex } from "antd";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useTranslation } from "react-i18next";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";

interface OrderProps {
  patient: Patient;
  order?: RequestOrchestration;
}

export const Order = ({ patient, order }: OrderProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle patient={patient!} hideMedicationPlanButton title={t("translation:createOrder.title")} />
      <Card style={{ height: "100%" }}>
        Order: {order?.id}, Patient: {patient.id}, Neu: {!order ? "Ja" : "Nein"}
      </Card>
    </Flex>
  );
};
