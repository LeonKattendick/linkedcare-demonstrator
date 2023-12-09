import { atom, useRecoilState } from "recoil";

const globalThemeAtom = atom({
  key: "globalThemeAtom",
  default: "dark",
});

export const useGlobalThemeAtom = () => {
  const [globalTheme, setGlobalTheme] = useRecoilState(globalThemeAtom);
  const isLightTheme = globalTheme === "light";

  return { globalTheme, setGlobalTheme, isLightTheme };
};
