import { Card, Flex } from "antd";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useGetAllValidMedicationRequestsForOrchestration } from "core/src/hook/filter/useGetAllValidMedicationRequestsForOrchestration";
import { useTranslation } from "react-i18next";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { calculateOrderState } from "../../../util/orderStateUtil";
import { CreateOrder } from "./CreateOrder";
import { EditOrder } from "./EditOrder";

interface OrderProps {
  patient: Patient;
  order: RequestOrchestration | null;
  caregiver?: Organization;
  doctor?: Practitioner;
  pharmacy?: Organization;
}

export const Order = (props: OrderProps) => {
  const { t } = useTranslation();

  const { requests } = useGetAllValidMedicationRequestsForOrchestration(props.order?.id, props.patient.id);

  const isNew = !props.order;
  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle
        patient={props.patient}
        hideMedicationPlanButton
        title={isNew ? t("translation:createOrder.title") : t("translation:editOrder.title")}
        orderState={calculateOrderState(requests, props.order)}
      />
      <Card style={{ height: "100%" }}>
        {isNew ? (
          <CreateOrder patient={props.patient} caregiver={props.caregiver!} />
        ) : (
          <EditOrder
            patient={props.patient}
            order={props.order!}
            caregiver={props.caregiver}
            doctor={props.doctor}
            pharmacy={props.pharmacy}
          />
        )}
      </Card>
    </Flex>
  );
};
