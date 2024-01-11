import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useGetAllPractitioners } from "../../../../hook/query/useGetAllPractitioners";

export const DoctorSelect = ({ isReadOnly }: { isReadOnly: boolean }) => {
  const { t } = useTranslation();
  const { practitioners, isPractitionersLoading } = useGetAllPractitioners();

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
        options={practitioners.map((v) => ({
          value: v.identifier[0].value,
          label: v.name[0].text,
        }))}
        disabled={isReadOnly}
        loading={isPractitionersLoading}
      />
    </Form.Item>
  );
};
