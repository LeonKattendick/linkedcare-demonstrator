import { Select } from "antd";
import { doctorModels } from "core/src/model/doctorModels";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedDoctorAtom } from "../hook/useSelectedDoctorAtom";

export const DoctorSelect = () => {
  const { t } = useTranslation();

  const { selectedDoctor, setSelectedDoctor } = useSelectedDoctorAtom();

  useEffect(() => {
    const localCaregiver = localStorage.getItem("selectedDoctor");
    if (localCaregiver) handleSetSelectedDoctor(localCaregiver);
  }, []);

  useEffect(() => {
    const id = selectedDoctor?.identifier[0].value ?? null;

    if (id) localStorage.setItem("selectedDoctor", id);
    else localStorage.removeItem("selectedDoctor");
  }, [selectedDoctor]);

  const handleSetSelectedDoctor = (id: string) => {
    setSelectedDoctor(doctorModels.find((v) => v.identifier[0].value == id) ?? null);
  };

  return (
    <Select
      style={{ width: 230, textAlign: "left" }}
      options={doctorModels.map((v) => ({
        value: v.identifier[0].value,
        label: `${v.name[0].text}`,
      }))}
      onSelect={(v) => handleSetSelectedDoctor(v)}
      allowClear
      value={selectedDoctor?.identifier[0].value}
      onClear={() => setSelectedDoctor(null)}
      placeholder={t("translation:doctor.selectPlaceholder")}
    />
  );
};
