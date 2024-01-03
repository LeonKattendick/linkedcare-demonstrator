import { Select } from "antd";
import { SequenceTableColumnProps } from ".";
import dosageData from "../../../../../data/dosage.json";

const compare = (input: string, label: string) => {
  return input.split(" ").filter((v) => !label.includes(v)).length === 0;
};

export const DoseTypeColumn = ({ dosage, handleChangeSequence, isReadOnly }: SequenceTableColumnProps) => {
  const handleChange = (code: string) => {
    handleChangeSequence({
      ...dosage,
      doseAndRate: [
        {
          ...dosage.doseAndRate![0],
          doseQuantity: {
            ...dosage.doseAndRate![0].doseQuantity,
            code,
          },
        },
      ],
    });
  };

  if (isReadOnly) return dosageData.find((v) => v.code === dosage.doseAndRate?.[0].doseQuantity.code)?.display;

  return (
    <Select
      value={dosage.doseAndRate?.[0].doseQuantity.code}
      size="small"
      options={dosageData.map((v) => ({ value: v.code, label: v.display }))}
      onChange={handleChange}
      showSearch
      filterOption={(input, option) => compare(input.toLowerCase(), (option?.label ?? "").toLowerCase())}
    />
  );
};
