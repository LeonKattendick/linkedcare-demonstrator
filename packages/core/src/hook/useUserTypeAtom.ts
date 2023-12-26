import { atom, useRecoilState } from "recoil";

export enum UserType {
  CAREGIVER = 1,
  DOCTOR = 2,
  PHARMACY = 3,
}

const userTypeAtom = atom({
  key: "userTypeAtom",
  default: 0,
});

export const useUserTypeAtom = () => {
  const [userType, setUserType] = useRecoilState(userTypeAtom);
  return { userType, setUserType };
};
