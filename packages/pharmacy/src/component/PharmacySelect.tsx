import { Select } from "antd";
import { useGetAllPharmacies } from "core/src/hook/filter/useGetAllPharmacies";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedPharmacyAtom } from "../hook/useSelectedPharmacyAtom";

export const PharmacySelect = () => {
  const { t } = useTranslation();

  const { pharmacies, isPharmaciesLoading } = useGetAllPharmacies();
  const { selectedPharmacy, setSelectedPharmacy } = useSelectedPharmacyAtom();

  const handleSetSelectedPharmacy = useCallback(
    (id: string) => {
      setSelectedPharmacy(pharmacies.find((v) => v.identifier[0].value == id) ?? null);
    },
    [pharmacies, setSelectedPharmacy]
  );

  useEffect(() => {
    const localPharmacy = localStorage.getItem("selectedPharmacy");
    if (localPharmacy) handleSetSelectedPharmacy(localPharmacy);
  }, [handleSetSelectedPharmacy]);

  useEffect(() => {
    if (isPharmaciesLoading) return;
    const id = selectedPharmacy?.identifier[0].value ?? null;

    if (id) localStorage.setItem("selectedPharmacy", id);
    else localStorage.removeItem("selectedPharmacy");
  }, [isPharmaciesLoading, selectedPharmacy]);

  return (
    <Select
      style={{ width: 280, textAlign: "left" }}
      options={pharmacies.map((v) => ({
        value: v.identifier[0].value,
        label: `${v.name}`,
      }))}
      onSelect={(v) => handleSetSelectedPharmacy(v)}
      allowClear
      value={selectedPharmacy?.identifier[0].value}
      onClear={() => setSelectedPharmacy(null)}
      placeholder={t("translation:pharmacy.selectPlaceholder")}
      loading={isPharmaciesLoading}
    />
  );
};
