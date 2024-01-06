import { InputNumber } from "antd";
import { SequenceTableColumnProps } from ".";

export const FrequencyColumn = ({ dosage, handleChangeSequence, isReadOnly }: SequenceTableColumnProps) => {
  const handleChange = (value: number | null) => {
    if (!value) return;
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

  if (isReadOnly) return dosage.timing?.repeat.frequency;

  return (
    <InputNumber
      value={dosage.timing?.repeat.frequency}
      size="small"
      style={{ width: "100%" }}
      onChange={handleChange}
      min={0}
    />
  );
};
