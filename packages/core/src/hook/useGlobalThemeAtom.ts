import { atom, useRecoilState } from "recoil";

const globalThemeAtom = atom({
  key: "globalThemeAtom",
  default: "light",
});

export const useGlobalThemeAtom = () => {
  const [globalTheme, setGlobalTheme] = useRecoilState(globalThemeAtom);
  return { globalTheme, setGlobalTheme };
};