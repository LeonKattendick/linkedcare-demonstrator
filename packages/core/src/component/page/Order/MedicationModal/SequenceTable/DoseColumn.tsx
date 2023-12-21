import { InputNumber } from "antd";
import { SequenceTableColumnProps } from ".";

export const DoseColumn = ({ dosage, handleChangeSequence }: SequenceTableColumnProps) => {
  const handleChange = (value: number | null) => {
    if (!value) value = 1;
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
