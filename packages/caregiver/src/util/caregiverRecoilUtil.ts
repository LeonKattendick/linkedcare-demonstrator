import { Organization } from "core/src/interface/linca/fhir/Organization";
import { atom } from "recoil";

export const selectedCaregiverAtom = atom<Organization | null>({
  key: "selectedCaregiverAtom",
  default: null,
});
