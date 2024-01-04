import { Card, Flex } from "antd";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useTranslation } from "react-i18next";
import { useGetAllMedicationDispensesByPatientAndRequests } from "../../../hook/filter/useGetAllMedicationDispensesByPatientAndRequests";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";
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
  requests: BaseMedicationRequest[];
  caregiver?: Organization;
  doctor?: Practitioner;
  pharmacy?: Organization;
}

export const Order = (props: OrderProps) => {
  const { t } = useTranslation();

  const { dispenses } = useGetAllMedicationDispensesByPatientAndRequests(props.patient.id, props.requests);

  const isNew = !props.order;
  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle
        patient={props.patient}
        hideMedicationPlanButton
        title={isNew ? t("translation:createOrder.title") : t("translation:editOrder.title")}
        orderState={calculateOrderState(props.requests, dispenses, props.order)}
      />
      <Card style={{ height: "100%" }}>
        {isNew ? (
          <CreateOrder patient={props.patient} caregiver={props.caregiver!} />
        ) : (
          <EditOrder
            patient={props.patient}
            order={props.order!}
            requests={props.requests}
            dispenses={dispenses}
            caregiver={props.caregiver}
            doctor={props.doctor}
            pharmacy={props.pharmacy}
          />
        )}
      </Card>
    </Flex>
  );
};
