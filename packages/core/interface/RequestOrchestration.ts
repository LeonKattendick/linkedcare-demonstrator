import { OrderMedicationRequest } from "./OrderMedicationRequest";
import { Organization } from "./fhir/Organization";
import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

export interface RequestOrchestration extends Resource {
  status: "active" | "revoked" | "completed";
  intent: "order";
  subject: Reference<Organization>;
  contained: OrderMedicationRequest[];
}
