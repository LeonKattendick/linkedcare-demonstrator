import { Button, Tooltip } from "antd";
import Flag from "react-flagkit";
import { useTranslation } from "react-i18next";
import { isGerman } from "../../../util/i18n";

export const LanguageButton = () => {
  const { t, i18n } = useTranslation();

  return (
    <Tooltip title={t("translation:changeLanguage")}>
      <Button
        onClick={() => {
          i18n.changeLanguage(isGerman(i18n.language) ? "en-US" : "de-DE");
        }}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        icon={<Flag country={isGerman(i18n.language) ? "AT" : "GB"} size={15} />}
      />
    </Tooltip>
  );
};
