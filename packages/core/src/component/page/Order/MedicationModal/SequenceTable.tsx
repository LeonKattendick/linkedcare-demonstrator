import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Table } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import dosageData from "../../../../data/dosage.json";
import { Dosage } from "../../../../interface/linca/fhir/Dosage";

export const SequenceTable = () => {
  const { t } = useTranslation();

  const [sequences, setSequences] = useState<Dosage[]>([]);

  const handleAdd = () => {
    setSequences([
      ...sequences,
      {
        sequence: sequences.length + 1,
        text: "",
        timing: {
          repeat: { boundsDuration: { value: 1, code: "mo" }, frequency: 1, period: 1, periodUnit: "d", dayOfWeek: [] },
        },
        doseAndRate: [
          {
            type: {
              coding: [
                { system: "http://terminology.hl7.org/CodeSystem/dose-rate-type", code: "ordered", display: "Ordered" },
              ],
            },
            doseQuantity: {
              system: "https://termgit.elga.gv.at/ValueSet/elga-medikationdarreichungsform",
              value: 1,
              code: dosageData[0].code,
            },
          },
        ],
      },
    ]);
  };

  return (
    <Form.Item
      name="sequences"
      rules={[
        {
          required: true,
          message: t("translation:order.medicationTable.modal.errorNoSequence"),
          validator: () => (sequences.length > 0 ? Promise.resolve(sequences) : Promise.reject()),
        },
        {
          required: true,
          message: t("translation:order.medicationTable.modal.errorEmptySequenceText"),
          validator: () =>
            !sequences.find((v) => v.text.trim().length === 0) ? Promise.resolve(sequences) : Promise.reject(),
        },
      ]}
      onReset={() => setSequences([])}
    >
      <Table
        dataSource={sequences}
        title={() => (
          <>
            {t("translation:order.medicationTable.title")}
            <Button type="primary" style={{ float: "right" }} size="small" icon={<PlusOutlined />} onClick={handleAdd}>
              {t("translation:order.medicationTable.modal.addSequence")}
            </Button>
          </>
        )}
        bordered
        size="small"
        pagination={false}
      ></Table>
    </Form.Item>
  );
};
