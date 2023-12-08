import { Organization } from "core/src/interface/linca/fhir/Organization";
import { atom, useRecoilState } from "recoil";

const selectedCaregiverAtom = atom<Organization | null>({
  key: "selectedCaregiverAtom",
  default: null,
});

export const useSelectedCaregiverAtom = () => {
  const [selectedCaregiver, setSelectedCaregiver] = useRecoilState(selectedCaregiverAtom);
  return { selectedCaregiver, setSelectedCaregiver };
};
