import { Medication } from "../interface/linca/Medication";
import { Dosage } from "../interface/linca/fhir/Dosage";

export type MedicationPlanItem = { medication: Medication; dosageInstruction: Dosage[] };

const aspirin: MedicationPlanItem = {
  medication: {
    concept: {
      coding: [
        {
          system: "https://termgit.elga.gv.at/CodeSystem-asp-liste",
          code: "1255446",
          display: "Aspirin 500 mg Tabletten (Tablette, 50 Stück)",
        },
      ],
    },
  },
  dosageInstruction: [
    {
      sequence: 1,
      text: "",
      timing: {
        repeat: { boundsDuration: { code: "a", value: 5 }, frequency: 0, period: 0, periodUnit: "d" },
      },
      doseAndRate: [
        {
          type: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                code: "calculated",
                display: "Calculated",
              },
            ],
          },
          doseQuantity: {
            system: "https://termgit.elga.gv.at/ValueSet/elga-medikationdarreichungsform",
            code: "100000073665",
            value: 1,
          },
        },
      ],
    },
  ],
};

const parkemed: MedicationPlanItem = {
  medication: {
    concept: {
      coding: [
        {
          system: "https://termgit.elga.gv.at/CodeSystem-asp-liste",
          code: "0533357",
          display: "Parkemed 500 mg - Filmtabletten (Filmtablette, 30 Stück)",
        },
      ],
    },
  },
  dosageInstruction: [
    {
      sequence: 1,
      text: "",
      timing: {
        repeat: { boundsDuration: { code: "mo", value: 1 }, frequency: 2, period: 1, periodUnit: "d" },
      },
      doseAndRate: [
        {
          type: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                code: "ordered",
                display: "Ordered",
              },
            ],
          },
          doseQuantity: {
            system: "https://termgit.elga.gv.at/ValueSet/elga-medikationdarreichungsform",
            code: "100000073665",
            value: 1,
          },
        },
      ],
    },
  ],
};

const deflamat: MedicationPlanItem = {
  medication: {
    concept: {
      coding: [
        {
          system: "https://termgit.elga.gv.at/CodeSystem-asp-liste",
          code: "1023368",
          display: "Deflamat 75 mg - Ampullen (Injektions-/Infusionslösung, 5 Stück)",
        },
      ],
    },
  },
  dosageInstruction: [
    {
      sequence: 1,
      text: "",
      timing: {
        repeat: { boundsDuration: { code: "mo", value: 2 }, frequency: 1, period: 1, periodUnit: "d" },
      },
      doseAndRate: [
        {
          type: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                code: "ordered",
                display: "Ordered",
              },
            ],
          },
          doseQuantity: {
            system: "https://termgit.elga.gv.at/ValueSet/elga-medikationdarreichungsform",
            code: "100000073665",
            value: 1,
          },
        },
      ],
    },
  ],
};

export const medicationPlanItemModels = [aspirin, parkemed, deflamat];
