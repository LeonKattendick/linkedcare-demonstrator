import { Select } from "antd";
import { useGetAllPractitioners } from "core/src/hook/query/useGetAllPractitioners";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedDoctorAtom } from "../hook/useSelectedDoctorAtom";

export const DoctorSelect = () => {
  const { t } = useTranslation();

  const { practitioners, isPractitionersLoading } = useGetAllPractitioners();
  const { selectedDoctor, setSelectedDoctor } = useSelectedDoctorAtom();

  useEffect(() => {
    const localDoctor = localStorage.getItem("selectedDoctor");
    if (localDoctor) handleSetSelectedDoctor(localDoctor);
  }, []);

  useEffect(() => {
    const id = selectedDoctor?.identifier[0].value ?? null;

    if (id) localStorage.setItem("selectedDoctor", id);
    else localStorage.removeItem("selectedDoctor");
  }, [selectedDoctor]);

  const handleSetSelectedDoctor = (id: string) => {
    setSelectedDoctor(practitioners.find((v) => v.identifier[0].value == id) ?? null);
  };

  return (
    <Select
      style={{ width: 230, textAlign: "left" }}
      options={practitioners.map((v) => ({
        value: v.identifier[0].value,
        label: `${v.name[0].text}`,
      }))}
      onSelect={(v) => handleSetSelectedDoctor(v)}
      allowClear
      value={selectedDoctor?.identifier[0].value}
      onClear={() => setSelectedDoctor(null)}
      placeholder={t("translation:doctor.selectPlaceholder")}
      loading={isPractitionersLoading}
    />
  );
};
