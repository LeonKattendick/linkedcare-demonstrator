import { InputNumber, Select } from "antd";
import { useTranslation } from "react-i18next";
import { SequenceTableColumnProps } from ".";

export const BoundsColumn = ({ dosage, handleChangeSequence, isReadOnly }: SequenceTableColumnProps) => {
  const { t } = useTranslation();

  const handleChangeNumber = (value: number | null) => {
    if (!value) return;
    handleChangeSequence({
      ...dosage,
      timing: {
        repeat: {
          ...dosage.timing!.repeat,
          boundsDuration: {
            value: value,
            code: dosage.timing!.repeat.boundsDuration.code,
          },
        },
      },
    });
  };

  const handleChangeSelect = (code: "h" | "d" | "wk" | "mo" | "a") => {
    handleChangeSequence({
      ...dosage,
      timing: {
        repeat: {
          ...dosage.timing!.repeat,
          boundsDuration: {
            code: code,
            value: dosage.timing!.repeat.boundsDuration.value,
          },
        },
      },
    });
  };

  if (isReadOnly) {
    return `${dosage.timing?.repeat.boundsDuration.value} ${t(
      `translation:general.time.${dosage.timing?.repeat.boundsDuration.code}`
    )}`;
  }

  return (
    <InputNumber
      value={dosage.timing?.repeat.boundsDuration.value}
      size="small"
      onChange={handleChangeNumber}
      min={1}
      controls={false}
      addonAfter={
        <Select
          value={dosage.timing?.repeat.boundsDuration.code}
          size="small"
          options={["h", "d", "wk", "mo", "a"].map((v) => ({ value: v, label: t(`translation:general.time.${v}`) }))}
          onChange={handleChangeSelect}
          style={{ width: 90, textAlign: "left" }}
        />
      }
    />
  );
};
