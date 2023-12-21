import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import { pharmacyModels } from "../../../../model/pharmacyModels";

export const PharmacySelect = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name="pharmacyIdentifier"
      label={t("translation:order.medicationTable.modal.pharmacy")}
      hasFeedback
      labelCol={{ span: 4 }}
      labelAlign="left"
    >
      <Select
        options={pharmacyModels.map((v) => ({
          value: v.identifier[0].value,
          label: v.name,
        }))}
      />
    </Form.Item>
  );
};
