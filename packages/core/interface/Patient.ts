import { Address } from "./fhir/Address";
import { ContactPoint } from "./fhir/ContactPoint";
import { HumanName } from "./fhir/HumanName";
import { Identifier } from "./fhir/Identifier";
import { Organization } from "./fhir/Organization";
import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

export interface Patient extends Resource {
  identifier: Identifier[]; // social security number
  name: HumanName[];
  active: boolean;
  gender: "male" | "female" | "other" | "unknown";
  birthDate: string; // e.g. 1971-07-07
  telecom: ContactPoint[];
  address: Address[];
  managingOrganization: Reference<Organization>;
}
