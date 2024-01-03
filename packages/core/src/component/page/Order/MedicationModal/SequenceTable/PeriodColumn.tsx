import { InputNumber, Select } from "antd";
import { useTranslation } from "react-i18next";
import { SequenceTableColumnProps } from ".";

export const PeriodColumn = ({ dosage, handleChangeSequence, isReadOnly }: SequenceTableColumnProps) => {
  const { t } = useTranslation();

  const handleChangeNumber = (value: number | null) => {
    if (!value) return;
    handleChangeSequence({
      ...dosage,
      timing: {
        repeat: {
          ...dosage.timing?.repeat!,
          period: value,
        },
      },
    });
  };

  const handleChangeSelect = (unit: "h" | "d" | "wk" | "mo" | "a") => {
    handleChangeSequence({
      ...dosage,
      timing: {
        repeat: {
          ...dosage.timing?.repeat!,
          periodUnit: unit,
        },
      },
    });
  };

  if (isReadOnly) {
    return `${dosage.timing?.repeat.period} ${t(`translation:general.time.${dosage.timing?.repeat.periodUnit}`)}`;
  }

  return (
    <InputNumber
      value={dosage.timing?.repeat.period}
      size="small"
      addonAfter={
        <Select
          value={dosage.timing?.repeat.periodUnit}
          size="small"
          options={["h", "d", "wk", "mo", "a"].map((v) => ({ value: v, label: t(`translation:general.time.${v}`) }))}
          onChange={handleChangeSelect}
          style={{ width: 85, textAlign: "left" }}
        />
      }
      onChange={handleChangeNumber}
      min={1}
    />
  );
};
