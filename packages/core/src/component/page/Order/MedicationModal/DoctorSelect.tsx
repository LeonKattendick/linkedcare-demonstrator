import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import { doctorModels } from "../../../../model/doctorModels";

export const DoctorSelect = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name="doctorIdentifier"
      label={t("translation:order.medicationTable.modal.doctor")}
      hasFeedback
      labelCol={{ span: 4 }}
      labelAlign="left"
      rules={[{ required: true, message: t("translation:order.medicationTable.modal.errorNoDoctor") }]}
    >
      <Select
        options={doctorModels.map((v) => ({
          value: v.identifier[0].value,
          label: v.name[0].text,
        }))}
      />
    </Form.Item>
  );
};
