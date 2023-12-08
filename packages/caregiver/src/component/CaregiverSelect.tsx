import { Select } from "antd";
import { caregiverModels } from "core/src/model/caregiverModels";
import { useTranslation } from "react-i18next";
import { useSelectedCaregiverAtom } from "../hook/useSelectedCaregiverAtom";

export const CaregiverSelect = () => {
  const { t } = useTranslation();
  const { selectedCaregiver, setSelectedCaregiver } = useSelectedCaregiverAtom();

  return (
    <Select
      style={{ width: 220 }}
      options={caregiverModels.map((v) => ({ value: v.identifier[0].value, label: v.name }))}
      onSelect={(v) => setSelectedCaregiver(caregiverModels.find((w) => w.identifier[0].value == v) ?? null)}
      allowClear
      value={selectedCaregiver?.identifier[0].value}
      onClear={() => setSelectedCaregiver(null)}
      placeholder={t("caregiver.selectPlaceholder")}
    />
  );
};
