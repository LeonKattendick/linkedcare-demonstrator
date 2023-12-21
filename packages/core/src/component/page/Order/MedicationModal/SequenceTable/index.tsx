import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Table } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import dosageData from "../../../../../data/dosage.json";
import { Dosage } from "../../../../../interface/linca/fhir/Dosage";
import { BoundsColumn } from "./BoundsColumn";
import { DoseColumn } from "./DoseColumn";
import { DoseRateColumn } from "./DoseRateColumn";
import { DoseTypeColumn } from "./DoseTypeColumn";
import { FrequencyColumn } from "./FrequencyColumn";
import { PeriodColumn } from "./PeriodColumn";
import { WeekDayColumn } from "./WeekDayColumn";

export interface SequenceTableColumnProps {
  dosage: Dosage;
  handleChangeSequence: (d: Dosage) => void;
}

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

  const createHandleChangeSequence = (index: number) => {
    return (dosage: Dosage) => {
      const temp = [...sequences];
      temp[index] = dosage;
      setSequences(temp);
    };
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
          width="13%"
          render={(_, record: Dosage, index) => (
            <BoundsColumn dosage={record} handleChangeSequence={createHandleChangeSequence(index)} />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.frequency")}
          width="7%"
          render={(_, record: Dosage, index) => (
            <FrequencyColumn dosage={record} handleChangeSequence={createHandleChangeSequence(index)} />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.period")}
          width="13%"
          render={(_, record: Dosage, index) => (
            <PeriodColumn dosage={record} handleChangeSequence={createHandleChangeSequence(index)} />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.weekDays")}
          width="20%"
          render={(_, record: Dosage, index) => (
            <WeekDayColumn dosage={record} handleChangeSequence={createHandleChangeSequence(index)} />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.dose")}
          width="7%"
          render={(_, record: Dosage, index) => (
            <DoseColumn dosage={record} handleChangeSequence={createHandleChangeSequence(index)} />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.doseType")}
          render={(_, record: Dosage, index) => (
            <DoseTypeColumn dosage={record} handleChangeSequence={createHandleChangeSequence(index)} />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.doseRate")}
          width="12%"
          render={(_, record: Dosage, index) => (
            <DoseRateColumn dosage={record} handleChangeSequence={createHandleChangeSequence(index)} />
          )}
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
