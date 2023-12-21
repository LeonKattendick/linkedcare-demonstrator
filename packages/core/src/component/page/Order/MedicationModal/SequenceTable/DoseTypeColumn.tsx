import { Select } from "antd";
import { SequenceTableColumnProps } from ".";
import dosageData from "../../../../../data/dosage.json";

export const DoseTypeColumn = ({ dosage, handleChangeSequence }: SequenceTableColumnProps) => {
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

  return (
    <Select
      value={dosage.doseAndRate?.[0].doseQuantity.code}
      size="small"
      options={dosageData.map((v) => ({ value: v.code, label: v.display }))}
      onChange={handleChange}
    />
  );
};
