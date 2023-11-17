/**
 * Refering to
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-medication.html
 * but implemented as a CodeableConcept (CodeableReference)
 * https://build.fhir.org/datatypes.html#CodeableConcept
 */
export interface Medication {
  concept: {
    coding: {
      system?: "https://termgit.elga.gv.at/CodeSystem-asp-liste";
      code?: string;
      display: string;
    }[];
  };
}
