import { Select } from "antd";
import { useGetAllCaregivers } from "core/src/hook/filter/useGetAllCaregivers";
import { ExternalReference } from "core/src/interface/linca/fhir/Reference";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedCaregiverAtom } from "../hook/useSelectedCaregiverAtom";

export const CaregiverSelect = () => {
  const { t } = useTranslation();

  const { caregivers, isCaregiversLoading } = useGetAllCaregivers();
  const { selectedCaregiver, setSelectedCaregiver } = useSelectedCaregiverAtom();

  const handleSetSelectedCaregiver = useCallback(
    (id: string) => {
      setSelectedCaregiver(caregivers.find((v) => v.identifier[0].value == id) ?? null);
    },
    [caregivers, setSelectedCaregiver]
  );

  useEffect(() => {
    const localCaregiver = localStorage.getItem("selectedCaregiver");
    if (localCaregiver) handleSetSelectedCaregiver(localCaregiver);
  }, [handleSetSelectedCaregiver]);

  useEffect(() => {
    if (isCaregiversLoading) return;
    const id = selectedCaregiver?.identifier[0].value ?? null;

    if (id) localStorage.setItem("selectedCaregiver", id);
    else localStorage.removeItem("selectedCaregiver");
  }, [isCaregiversLoading, selectedCaregiver]);

  return (
    <Select
      style={{ width: 335, textAlign: "left" }}
      options={caregivers.map((v) => ({
        value: v.identifier[0].value,
        label: `${v.name} (${(v.partOf as ExternalReference).display})`,
      }))}
      onSelect={(v) => handleSetSelectedCaregiver(v)}
      allowClear
      value={selectedCaregiver?.identifier[0].value}
      onClear={() => setSelectedCaregiver(null)}
      placeholder={t("translation:caregiver.selectPlaceholder")}
      loading={isCaregiversLoading}
    />
  );
};
