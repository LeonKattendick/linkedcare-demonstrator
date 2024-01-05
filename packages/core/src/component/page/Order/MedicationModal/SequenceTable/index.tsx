import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Table } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dosageData from "../../../../../data/dosage.json";
import { Dosage } from "../../../../../interface/linca/fhir/Dosage";
import { createNewDosage } from "../../../../../util/orderUtil";
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
  isReadOnly: boolean;
}

export const SequenceTable = ({ form, isReadOnly }: { form: FormInstance; isReadOnly: boolean }) => {
  const { t } = useTranslation();

  const [sequences, setSequences] = useState<Dosage[]>([]);

  // sets initial values of form into the useState
  useEffect(() => {
    setSequences(form.getFieldValue("sequences") ?? []);
  }, [form]);

  // sets changed values back into the form
  useEffect(() => {
    form.setFieldValue("sequences", sequences);
  }, [sequences]);

  const handleAdd = () => {
    setSequences([...sequences, createNewDosage(sequences.length + 1, dosageData[0].code)]);
  };

  const handleDelete = (index: number) => {
    const temp = [...sequences];
    setSequences(temp.filter((_, i) => i !== index).map((v, i) => ({ ...v, sequence: i + 1 })));
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
      ]}
      onReset={() => setSequences([])}
    >
      <Table
        dataSource={sequences}
        rowKey={(v) => v.sequence!}
        title={() => (
          <>
            {t("translation:order.medicationTable.modal.table.title")}
            {!isReadOnly && (
              <Button
                type="primary"
                style={{ float: "right" }}
                size="small"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                {t("translation:order.medicationTable.modal.addSequence")}
              </Button>
            )}
          </>
        )}
        bordered
        size="small"
        pagination={false}
      >
        <Table.Column title="#" width="3%" dataIndex="sequence" />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.bounds")}
          width="13%"
          render={(_, record: Dosage, index) => (
            <BoundsColumn
              dosage={record}
              handleChangeSequence={createHandleChangeSequence(index)}
              isReadOnly={isReadOnly}
            />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.frequency")}
          width="7%"
          render={(_, record: Dosage, index) => (
            <FrequencyColumn
              dosage={record}
              handleChangeSequence={createHandleChangeSequence(index)}
              isReadOnly={isReadOnly}
            />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.period")}
          width="13%"
          render={(_, record: Dosage, index) => (
            <PeriodColumn
              dosage={record}
              handleChangeSequence={createHandleChangeSequence(index)}
              isReadOnly={isReadOnly}
            />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.weekDays")}
          width="20%"
          render={(_, record: Dosage, index) => (
            <WeekDayColumn
              dosage={record}
              handleChangeSequence={createHandleChangeSequence(index)}
              isReadOnly={isReadOnly}
            />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.dose")}
          width="7%"
          render={(_, record: Dosage, index) => (
            <DoseColumn
              dosage={record}
              handleChangeSequence={createHandleChangeSequence(index)}
              isReadOnly={isReadOnly}
            />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.doseType")}
          render={(_, record: Dosage, index) => (
            <DoseTypeColumn
              dosage={record}
              handleChangeSequence={createHandleChangeSequence(index)}
              isReadOnly={isReadOnly}
            />
          )}
        />
        <Table.Column
          title={t("translation:order.medicationTable.modal.table.doseRate")}
          width="12%"
          render={(_, record: Dosage, index) => (
            <DoseRateColumn
              dosage={record}
              handleChangeSequence={createHandleChangeSequence(index)}
              isReadOnly={isReadOnly}
            />
          )}
        />
        {!isReadOnly && (
          <Table.Column
            title={t("translation:general.actions")}
            width="7%"
            render={(_, _record: Dosage, index) => (
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => handleDelete(index)}
              />
            )}
          />
        )}
      </Table>
    </Form.Item>
  );
};
