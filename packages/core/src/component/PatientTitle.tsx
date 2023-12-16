import { MedicineBoxOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface PatientTitleProps {
  patient: Patient;
  title: string;
  hideMedicationPlanButton?: boolean;
}

export const PatientTitle = (props: PatientTitleProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card size="small" style={{ paddingLeft: 12 }}>
      <div style={{ fontSize: 20, fontWeight: "lighter" }}>{props.title}</div>
      <Space size="middle">
        <div style={{ fontSize: 22, fontWeight: "bold" }}>{props.patient.name[0]?.text}</div>
        {!props.hideMedicationPlanButton && (
          <Button
            type="primary"
            onClick={() => navigate(`/plan/${props.patient.id}`)}
            icon={<MedicineBoxOutlined />}
            size="small"
          >
            {t("translation:patient.medicationPlan")}
          </Button>
        )}
      </Space>
    </Card>
  );
};
