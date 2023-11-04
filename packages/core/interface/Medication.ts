export interface Medication {
  concept: {
    coding: {
      system?: "https://termgit.elga.gv.at/CodeSystem-asp-liste";
      code?: string;
      display: string;
    }[];
  };
}
