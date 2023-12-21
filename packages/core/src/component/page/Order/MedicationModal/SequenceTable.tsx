import { Form, Table } from "antd";
import { useTranslation } from "react-i18next";
import { Dosage } from "../../../../interface/linca/fhir/Dosage";

interface SequenceTableProps {
  sequences: Dosage[];
  setSequences: (d: Dosage[]) => void;
}

export const SequenceTable = ({ sequences }: SequenceTableProps) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name="sequences"
      rules={[
        {
          required: true,
          message: t("translation:order.medicationTable.modal.errorNoSequence"),
          validator: () => (sequences.length > 0 ? Promise.resolve(sequences) : Promise.reject()),
        },
      ]}
    >
      <Table dataSource={sequences} bordered></Table>
    </Form.Item>
  );
};
