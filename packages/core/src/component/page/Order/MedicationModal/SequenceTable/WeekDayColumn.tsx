import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { SequenceTableColumnProps } from ".";

const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const WeekDayColumn = ({ dosage, handleChangeSequence, isReadOnly }: SequenceTableColumnProps) => {
  const { t } = useTranslation();

  const handleChange = (value: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[]) => {
    handleChangeSequence({
      ...dosage,
      timing: {
        repeat: {
          ...dosage.timing?.repeat!,
          dayOfWeek: value.sort((a, b) => weekDays.indexOf(a) - weekDays.indexOf(b)),
        },
      },
    });
  };

  if (isReadOnly) {
    return dosage.timing?.repeat.dayOfWeek?.map((v) => t(`translation:general.shortWeekDays.${v}`)).join(", ");
  }

  return (
    <Select
      value={dosage.timing?.repeat.dayOfWeek}
      mode="tags"
      size="small"
      options={weekDays.map((v) => ({
        value: v,
        label: t(`translation:general.shortWeekDays.${v}`),
        desc: t(`translation:general.weekDays.${v}`),
      }))}
      optionLabelProp="label"
      optionRender={(option) => option.data.desc}
      onChange={handleChange}
      maxTagCount={3}
    />
  );
};
