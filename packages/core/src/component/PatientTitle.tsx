import { LoadingOutlined, MedicineBoxOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Row, Space, Steps } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface PatientTitleProps {
  patient: Patient;
  title: string;
  hideMedicationPlanButton?: boolean;
  currentState?: "caregiver" | "doctor" | "returned" | "pharmacy" | "completed";
}

const caregiverSteps = {
  caregiver: "process",
  doctor: "finish",
  returned: "process",
  pharmacy: "finish",
  completed: "finish",
};

const doctorSteps = { doctor: "process", returned: "error", pharmacy: "finish", completed: "finish" };

const pharmacySteps = { pharmacy: "process", completed: "finish" };

export const PatientTitle = (props: PatientTitleProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card size="small" style={{ padding: "0 12px" }}>
      <Row>
        <Col span={7}>
          <Flex vertical>
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
          </Flex>
        </Col>
        {props.currentState && (
          <Col span={17} style={{ display: "flex", alignItems: "center" }}>
            <Steps
              items={[
                {
                  title: t("translation:order.steps.caregiver"),
                  status: caregiverSteps[props.currentState],
                  icon: ["caregiver", "returned"].includes(props.currentState) ? <LoadingOutlined /> : <UserOutlined />,
                },
                {
                  title: t("translation:order.steps.doctor"),
                  status: (doctorSteps as any)[props.currentState] ?? "wait",
                  icon: props.currentState === "doctor" ? <LoadingOutlined /> : <SolutionOutlined />,
                },
                {
                  title: t("translation:order.steps.pharmacy"),
                  status: (pharmacySteps as any)[props.currentState] ?? "wait",
                  icon: props.currentState === "pharmacy" ? <LoadingOutlined /> : <MedicineBoxOutlined />,
                },
              ]}
            />
          </Col>
        )}
      </Row>
    </Card>
  );
};
