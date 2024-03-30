import { Card, Flex, Table } from "antd";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useTranslation } from "react-i18next";
import dosageData from "../../data/dosage.json";
import { Patient } from "../../interface/linca/Patient";
import { MedicationPlanItem, medicationPlanItemModels } from "../../model/medicationPlanItemModels";

interface MedicationPlanProps {
  patient: Patient;
}

export const MedicationPlan = ({ patient }: MedicationPlanProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle patient={patient} hideMedicationPlanButton title={t("translation:patient.medicationPlan")} />
      <Card style={{ height: "100%" }}>
        <Table dataSource={medicationPlanItemModels} bordered size="middle">
          <Table.Column
            title={t("translation:medicationPlan.medication")}
            render={(_, record: MedicationPlanItem) => record.medication.concept.coding[0].display}
          />
          <Table.Column
            title={t("translation:medicationPlan.bounds")}
            render={(_, record: MedicationPlanItem) =>
              `${record.dosageInstruction[0].timing?.repeat.boundsDuration.value} ${t(
                `translation:general.time.${record.dosageInstruction[0].timing?.repeat.boundsDuration.code}`
              )}`
            }
          />
          <Table.Column
            title={t("translation:medicationPlan.frequencyAndPeriod")}
            render={(_, record: MedicationPlanItem) => {
              const frequency = record.dosageInstruction[0].timing?.repeat.frequency;
              const period = record.dosageInstruction[0].timing?.repeat.period;
              if (frequency === 0 && period === 0) return t("translation:medicationPlan.longTermMedication");

              return t("translation:general.frequencyAndPeriodRender", {
                frequency,
                period,
                periodUnit: t(`translation:general.time.${record.dosageInstruction[0].timing?.repeat.periodUnit}`),
              });
            }}
          />
          <Table.Column
            title={t("translation:medicationPlan.weekDays")}
            render={(_, record: MedicationPlanItem) =>
              record.dosageInstruction[0].timing?.repeat.dayOfWeek
                ?.map((v) => t(`translation:general.shortWeekDays.${v}`))
                .join(", ")
            }
          />
          <Table.Column
            title={t("translation:medicationPlan.dose")}
            render={(_, record: MedicationPlanItem) =>
              t("translation:general.doseRender", {
                dose: record.dosageInstruction[0].doseAndRate?.[0].doseQuantity.value,
                doseType: dosageData.find(
                  (v) => v.code === record.dosageInstruction[0].doseAndRate?.[0].doseQuantity.code
                )?.display,
                doseRate: t(
                  `translation:general.doseRateTypes.${record.dosageInstruction[0].doseAndRate?.[0].type.coding[0].code}`
                ),
              })
            }
          />
        </Table>
      </Card>
    </Flex>
  );
};
