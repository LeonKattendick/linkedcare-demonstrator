import { Button, Select, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dosage } from "../../../../interface/linca/fhir/Dosage";
import { medicationPlanItemModels } from "../../../../model/medicationPlanItemModels";
import { renderMedicationRequest } from "../../../../util/renderUtil";

interface SelectFromMedicationPlanProps {
  selectPreset: (medicationCode: string, dosages: Dosage[]) => void;
}

export const SelectFromMedicationPlan = ({ selectPreset }: SelectFromMedicationPlanProps) => {
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState<number>();

  const handleTakeOver = () => {
    if (selectedItem === undefined) return;
    const item = medicationPlanItemModels[selectedItem];
    selectPreset(item.medication.concept.coding[0].code!, item.dosageInstruction);
    setSelectedItem(undefined);
  };

  return (
    <Space>
      <Select
        style={{ width: 800 }}
        placeholder={t("translation:order.medicationTable.modal.select.placeholderMedicationPlan")}
        options={medicationPlanItemModels.map((v, i) => ({
          value: i,
          label: renderMedicationRequest(v, t),
        }))}
        value={selectedItem}
        onSelect={setSelectedItem}
      />
      <Button type="primary" disabled={selectedItem === undefined} onClick={handleTakeOver}>
        {t("translation:order.medicationTable.modal.select.takeOver")}
      </Button>
    </Space>
  );
};
