import { Select } from "antd";
import { ExternalReference } from "core/src/interface/linca/fhir/Reference";
import { caregiverModels } from "core/src/model/caregiverModels";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedCaregiverAtom } from "../hook/useSelectedCaregiverAtom";

export const CaregiverSelect = () => {
  const { t } = useTranslation();

  const { selectedCaregiver, setSelectedCaregiver } = useSelectedCaregiverAtom();

  useEffect(() => {
    const localCaregiver = localStorage.getItem("selectedCaregiver");
    if (localCaregiver) handleSetSelectedCaregiver(localCaregiver);
  }, []);

  useEffect(() => {
    const id = selectedCaregiver?.identifier[0].value ?? null;

    if (id) localStorage.setItem("selectedCaregiver", id);
    else localStorage.removeItem("selectedCaregiver");
  }, [selectedCaregiver]);

  const handleSetSelectedCaregiver = (id: string) => {
    setSelectedCaregiver(caregiverModels.find((v) => v.identifier[0].value == id) ?? null);
  };

  return (
    <Select
      style={{ width: 335, textAlign: "left" }}
      options={caregiverModels.map((v) => ({
        value: v.identifier[0].value,
        label: `${v.name} (${(v.partOf as ExternalReference).display})`,
      }))}
      onSelect={(v) => handleSetSelectedCaregiver(v)}
      allowClear
      value={selectedCaregiver?.identifier[0].value}
      onClear={() => setSelectedCaregiver(null)}
      placeholder={t("translation:caregiver.selectPlaceholder")}
    />
  );
};
