/**
 * https://hl7.org/fhir/R5/datatypes.html#ContactPoint
 */
export interface ContactPoint {
  system: "phone" | "email";
  value: string;
  use: "mobile" | "home" | "work";
}
