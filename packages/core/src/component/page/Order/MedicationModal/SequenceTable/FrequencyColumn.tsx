import { InputNumber } from "antd";
import { SequenceTableColumnProps } from ".";

export const FrequencyColumn = ({ dosage, handleChangeSequence }: SequenceTableColumnProps) => {
  const handleChange = (value: number | null) => {
    if (!value) value = 1;
    handleChangeSequence({
      ...dosage,
      timing: {
        repeat: {
          ...dosage.timing?.repeat!,
          frequency: value,
        },
      },
    });
  };

  return (
    <InputNumber
      value={dosage.timing?.repeat.frequency}
      size="small"
      style={{ width: "100%" }}
      onChange={handleChange}
      min={1}
    />
  );
};
