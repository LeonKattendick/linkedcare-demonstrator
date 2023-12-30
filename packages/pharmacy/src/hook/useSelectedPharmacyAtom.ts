import { Organization } from "core/src/interface/linca/fhir/Organization";
import { atom, useRecoilState } from "recoil";

const selectedPharmacyAtom = atom<Organization | null>({
  key: "selectedPharmacyAtom",
  default: null,
});

export const useSelectedPharmacyAtom = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useRecoilState(selectedPharmacyAtom);
  return { selectedPharmacy, setSelectedPharmacy };
};
