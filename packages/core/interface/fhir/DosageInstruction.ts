export interface DosageInstruction {
  sequence?: number;
  text: string;
  timing?: {
    repeat: {
      boundsDuration: {
        value: number;
        code: "h" | "d" | "wk" | "mo" | "a";
      };
      frequency: number; // Number of repetions per period
      period: number; //
      periodUnit: "h" | "d" | "wk" | "mo" | "a";
      dayOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
    };
  };
  doseAndRate?: {
    type: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/dose-rate-type";
          code: "calculated" | "ordered";
          display: "Calculated" | "Ordered";
        }
      ];
    };
    doseQuantity: {
      value: number;
      code: string;
    };
  }[];
}
