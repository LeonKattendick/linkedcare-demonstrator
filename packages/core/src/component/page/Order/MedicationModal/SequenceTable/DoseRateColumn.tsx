import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { SequenceTableColumnProps } from ".";

export const DoseRateColumn = ({ dosage, handleChangeSequence, isReadOnly }: SequenceTableColumnProps) => {
  const { t } = useTranslation();

  const handleChange = (code: "calculated" | "ordered") => {
    handleChangeSequence({
      ...dosage,
      doseAndRate: [
        {
          ...dosage.doseAndRate![0],
          type: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                code,
                display: code === "calculated" ? "Calculated" : "Ordered",
              },
            ],
          },
        },
      ],
    });
  };

  if (isReadOnly) {
    return t(
      `translation:order.medicationTable.modal.table.doseRateTypes.${dosage.doseAndRate?.[0].type.coding[0].code}`
    );
  }

  return (
    <Select
      value={dosage.doseAndRate?.[0].type.coding[0].code}
      size="small"
      options={["ordered", "calculated"].map((v) => ({
        value: v,
        label: t(`translation:order.medicationTable.modal.table.doseRateTypes.${v}`),
      }))}
      onChange={handleChange}
    />
  );
};
