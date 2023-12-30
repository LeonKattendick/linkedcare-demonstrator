import { Select } from "antd";
import { pharmacyModels } from "core/src/model/pharmacyModels";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedPharmacyAtom } from "../hook/useSelectedPharmacyAtom";

export const PharmacySelect = () => {
  const { t } = useTranslation();

  const { selectedPharmacy, setSelectedPharmacy } = useSelectedPharmacyAtom();

  useEffect(() => {
    const localPharmacy = localStorage.getItem("selectedPharmacy");
    if (localPharmacy) handleSetSelectedPharmacy(localPharmacy);
  }, []);

  useEffect(() => {
    const id = selectedPharmacy?.identifier[0].value ?? null;

    if (id) localStorage.setItem("selectedPharmacy", id);
    else localStorage.removeItem("selectedPharmacy");
  }, [selectedPharmacy]);

  const handleSetSelectedPharmacy = (id: string) => {
    setSelectedPharmacy(pharmacyModels.find((v) => v.identifier[0].value == id) ?? null);
  };

  return (
    <Select
      style={{ width: 280, textAlign: "left" }}
      options={pharmacyModels.map((v) => ({
        value: v.identifier[0].value,
        label: `${v.name}`,
      }))}
      onSelect={(v) => handleSetSelectedPharmacy(v)}
      allowClear
      value={selectedPharmacy?.identifier[0].value}
      onClear={() => setSelectedPharmacy(null)}
      placeholder={t("translation:pharmacy.selectPlaceholder")}
    />
  );
};
