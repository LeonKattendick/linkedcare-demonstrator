/**
 * https://hl7.org/fhir/R5/datatypes.html#HumanName
 */
export interface HumanName {
  use: "official";
  text: string;
  family: string;
  given: string[];
}
