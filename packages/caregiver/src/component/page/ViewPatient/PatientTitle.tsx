import { MedicineBoxOutlined } from "@ant-design/icons";
import { Button, Card, Flex } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface PatientTitleProps {
  patient: Patient;
}

export const PatientTitle = ({ patient }: PatientTitleProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card>
      <Flex align="center" gap={16}>
        <span style={{ fontSize: 20, fontWeight: "bold" }}>{patient.name[0]?.text}</span>
        <Button type="primary" onClick={() => navigate(`/plan/${patient.id}`)} icon={<MedicineBoxOutlined />}>
          {t("viewPatient.medicationPlan")}
        </Button>
      </Flex>
    </Card>
  );
};
