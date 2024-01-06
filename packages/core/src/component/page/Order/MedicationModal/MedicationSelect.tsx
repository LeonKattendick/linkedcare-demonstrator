import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import medicationData from "../../../../data/medication.json";
import { compare } from "../../../../util/matchingUtil";

export const MedicationSelect = ({ isReadOnly }: { isReadOnly: boolean }) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name="medicationIndex"
      label={t("translation:order.medicationTable.modal.medication")}
      hasFeedback
      labelCol={{ span: 4 }}
      labelAlign="left"
      rules={[{ required: true, message: t("translation:order.medicationTable.modal.errorNoMedication") }]}
    >
      <Select
        options={medicationData.map((v) => ({
          value: v.code,
          label: `${v.approvalName} (${v.dosageForm}, ${v.dosageSize})`,
        }))}
        showSearch
        filterOption={(input, option) => compare(input.toLowerCase(), (option?.label ?? "").toLowerCase())}
        disabled={isReadOnly}
      />
    </Form.Item>
  );
};
