import { BgColorsOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useGlobalThemeAtom } from "../../../hook/useGlobalThemeAtom";

export const ThemeButton = () => {
  const { t } = useTranslation();
  const { globalTheme, setGlobalTheme } = useGlobalThemeAtom();

  const isLightTheme = globalTheme === "light";

  return (
    <Tooltip title={t("changeTheme")}>
      <Button
        onClick={() => {
          setGlobalTheme(isLightTheme ? "dark" : "light");
        }}
        icon={<BgColorsOutlined />}
      />
    </Tooltip>
  );
};
