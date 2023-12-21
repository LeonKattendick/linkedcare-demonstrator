import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Select, Space, Table } from "antd";
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
            {t("translation:order.medicationTable.modal.table.title")}
            <Button type="primary" style={{ float: "right" }} size="small" icon={<PlusOutlined />} onClick={handleAdd}>
              {t("translation:order.medicationTable.modal.addSequence")}
            </Button>
          </>
        )}
        bordered
        size="small"
        pagination={false}
      >
        <Table.Column title={"#"} width="3%" dataIndex="sequence" />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.bounds")}
          width="10%"
          render={(_, record: Dosage) => (
            <Space>
              <InputNumber
                value={record.timing?.repeat.boundsDuration.value}
                size="small"
                addonAfter={<Select value={record.timing?.repeat.boundsDuration.code} size="small" />}
              />
            </Space>
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.frequency")}
          width="7%"
          render={(_, record: Dosage) => (
            <InputNumber value={record.timing?.repeat.frequency} size="small" style={{ width: "100%" }} />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.period")}
          width="12%"
          render={(_, record: Dosage) => (
            <Space>
              <InputNumber
                value={record.timing?.repeat.period}
                size="small"
                addonAfter={<Select value={record.timing?.repeat.periodUnit} size="small" />}
              />
            </Space>
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.weekDays")}
          render={(_, record: Dosage) => (
            <Select value={record.timing?.repeat.dayOfWeek} mode="multiple" size="small" />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.dose")}
          width="7%"
          render={(_, record: Dosage) => (
            <InputNumber value={record.doseAndRate?.[0].doseQuantity.value} size="small" style={{ width: "100%" }} />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.doseType")}
          render={(_, record: Dosage) => (
            <Select
              value={record.doseAndRate?.[0].doseQuantity.code}
              size="small"
              options={dosageData.map((v) => ({ value: v.code, label: v.display }))}
            />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.doseRate")}
          width="12%"
          render={(_, record: Dosage) => <Select value={record.doseAndRate?.[0].type.coding[0].code} size="small" />}
        />
        <Table.Column
          title={t("translation:general.actions")}
          width="7%"
          render={(_, _record: Dosage) => <Button type="primary" danger icon={<DeleteOutlined />} size="small" />}
        />
      </Table>
    </Form.Item>
  );
};
