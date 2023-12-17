import { Card, Flex } from "antd";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useTranslation } from "react-i18next";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { CreateOrder } from "./CreateOrder";
import { EditOrder } from "./EditOrder";

interface OrderProps {
  patient: Patient;
  order: RequestOrchestration | null;
  caregiver?: Organization;
  doctor?: Practitioner;
  isNew?: boolean;
}

export const Order = (props: OrderProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle
        patient={props.patient}
        hideMedicationPlanButton
        title={t("translation:createOrder.title")}
        currentState={props.isNew ? "caregiver" : "completed"}
      />
      <Card style={{ height: "100%" }}>
        {props.isNew ? (
          <CreateOrder patient={props.patient} caregiver={props.caregiver!} />
        ) : (
          <EditOrder patient={props.patient} order={props.order!} caregiver={props.caregiver} doctor={props.doctor} />
        )}
      </Card>
    </Flex>
  );
};