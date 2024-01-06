import { Button, Select, Space } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetAllValidMedicationRequestsByPatient } from "../../../../hook/filter/useGetAllValidMedicationRequestsByPatient";
import { Patient } from "../../../../interface/linca/Patient";
import { Dosage } from "../../../../interface/linca/fhir/Dosage";
import { compare } from "../../../../util/matchingUtil";
import { renderMedicationRequest } from "../../../../util/renderUtil";

interface SelectFromOtherOrdersProps {
  patient: Patient;
  selectPreset: (medicationCode: string, dosages: Dosage[]) => void;
}

export const SelectFromOtherOrders = ({ patient, selectPreset }: SelectFromOtherOrdersProps) => {
  const { t } = useTranslation();
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequestsByPatient(patient.id);

  const [selectedItem, setSelectedItem] = useState<number>();

  const uniqueRequests = useMemo(() => {
    const uniqueIds: string[] = [];
    const uniqueNames = new Set<string>();

    for (const request of requests) {
      const name = renderMedicationRequest(request, t);
      if (uniqueNames.has(name)) continue;

      uniqueIds.push(request.id!);
      uniqueNames.add(name);
    }

    return requests
      .filter((v) => uniqueIds.includes(v.id!))
      .sort((a, b) => renderMedicationRequest(a, t).localeCompare(renderMedicationRequest(b, t)));
  }, [requests, t]);

  const handleTakeOver = () => {
    if (selectedItem === undefined) return;
    const item = requests[selectedItem];
    selectPreset(item.medication.concept.coding[0].code!, item.dosageInstruction);
    setSelectedItem(undefined);
  };

  return (
    <Space>
      <Select
        style={{ width: 800 }}
        placeholder={t("translation:order.medicationTable.modal.select.placeholderOtherOrders")}
        loading={isRequestsLoading}
        options={uniqueRequests.map((v, i) => ({
          value: i,
          label: renderMedicationRequest(v, t),
        }))}
        value={selectedItem}
        onSelect={setSelectedItem}
        showSearch
        filterOption={(input, option) => compare(input.toLowerCase(), (option?.label ?? "").toLowerCase())}
      />
      <Button type="primary" disabled={selectedItem === undefined} onClick={handleTakeOver}>
        {t("translation:order.medicationTable.modal.select.takeOver")}
      </Button>
    </Space>
  );
};
