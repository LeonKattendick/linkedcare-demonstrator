import { Card, Flex } from "antd";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useTranslation } from "react-i18next";
import { Patient } from "../../interface/linca/Patient";

interface MedicationPlanProps {
  patient: Patient;
}

export const MedicationPlan = ({ patient }: MedicationPlanProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle patient={patient} hideMedicationPlanButton title={t("translation:patient.medicationPlan")} />
      <Card style={{ height: "100%" }}>test</Card>
    </Flex>
  );
};
