import { atom } from "recoil";
import { Organization } from "../interface/linca/fhir/Organization";

export const globalThemeAtom = atom({
  key: "globalThemeAtom",
  default: "light",
});

export const selectedCaregiverAtom = atom<Organization | null>({
  key: "selectedCaregiverAtom",
  default: null,
});
