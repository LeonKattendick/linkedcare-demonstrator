import { Practitioner } from "core/src/interface/linca/fhir/Practitioner";
import { atom, useRecoilState } from "recoil";

const selectedDoctorAtom = atom<Practitioner | null>({
  key: "selectedDoctorAtom",
  default: null,
});

export const useSelectedDoctorAtom = () => {
  const [selectedDoctor, setSelectedDoctor] = useRecoilState(selectedDoctorAtom);
  return { selectedDoctor, setSelectedDoctor };
};
