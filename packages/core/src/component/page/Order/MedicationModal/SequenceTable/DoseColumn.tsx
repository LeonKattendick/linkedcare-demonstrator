import { InputNumber } from "antd";
import { SequenceTableColumnProps } from ".";

export const DoseColumn = ({ dosage, handleChangeSequence, isReadOnly }: SequenceTableColumnProps) => {
  const handleChange = (value: number | null) => {
    if (!value) return;
    handleChangeSequence({
      ...dosage,
      doseAndRate: [
        {
          ...dosage.doseAndRate![0],
          doseQuantity: {
            ...dosage.doseAndRate![0].doseQuantity,
            value,
          },
        },
      ],
    });
  };

  if (isReadOnly) return dosage.doseAndRate?.[0].doseQuantity.value;

  return (
    <InputNumber
      value={dosage.doseAndRate?.[0].doseQuantity.value}
      size="small"
      style={{ width: "100%" }}
      onChange={handleChange}
      min={1}
    />
  );
};
