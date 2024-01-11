import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useGetAllPharmacies } from "../../../../hook/filter/useGetAllPharmacies";

export const PharmacySelect = ({ isReadOnly }: { isReadOnly: boolean }) => {
  const { t } = useTranslation();
  const { pharmacies, isPharmaciesLoading } = useGetAllPharmacies();

  return (
    <Form.Item
      name="pharmacyIdentifier"
      label={t("translation:order.medicationTable.modal.pharmacy")}
      hasFeedback
      labelCol={{ span: 4 }}
      labelAlign="left"
    >
      <Select
        options={pharmacies.map((v) => ({
          value: v.identifier[0].value,
          label: v.name,
        }))}
        allowClear
        disabled={isReadOnly}
        loading={isPharmaciesLoading}
      />
    </Form.Item>
  );
};
