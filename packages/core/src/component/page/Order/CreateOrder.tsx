import { useState } from "react";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { createNewRequestOrchestration } from "../../../util/requestOrchestrationUtil";

interface CreateOrderProps {
  patient: Patient;
  caregiver: Organization;
}

export const CreateOrder = (props: CreateOrderProps) => {
  const [_order, _setOrder] = useState<RequestOrchestration>(createNewRequestOrchestration(props.caregiver));

  return <></>;
};
