import { Button, Tooltip } from "antd";
import Flag from "react-flagkit";
import { useTranslation } from "react-i18next";

export const LanguageButton = () => {
  const { t, i18n } = useTranslation();

  const isGerman = ["de", "de-DE", "de-AT"].includes(i18n.language);

  return (
    <Tooltip title={t("changeLanguage")}>
      <Button
        onClick={() => {
          i18n.changeLanguage(isGerman ? "en-US" : "de-DE");
        }}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        icon={<Flag country={isGerman ? "AT" : "GB"} size={15} />}
      />
    </Tooltip>
  );
};
