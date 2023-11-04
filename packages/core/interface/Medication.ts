/**
 * Refering to
 * https://fhir.hl7.at/r5-LinkedCare-main/StructureDefinition-linca-medication.html
 * but implemented as CodeableReference
 * https://hl7.org/fhir/R5/references-definitions.html#CodeableReference
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
