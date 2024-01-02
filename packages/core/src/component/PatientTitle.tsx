import {
  CaretLeftOutlined,
  LoadingOutlined,
  MedicineBoxOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Flex, Row, Space, Steps } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { OrderState } from "../util/orderStateUtil";

interface PatientTitleProps {
  patient: Patient;
  title: string | JSX.Element;
  hideMedicationPlanButton?: boolean;
  orderState?: OrderState;
}

const caregiverSteps = {
  CAREGIVER: "process",
  DOCTOR: "finish",
  BOTH: "finish",
  PHARMACY: "finish",
  COMPLETED: "finish",
  REVOKED: "error",
};

const doctorSteps = { DOCTOR: "process", BOTH: "finish", PHARMACY: "finish", COMPLETED: "finish" };

const pharmacySteps = { BOTH: "process", PHARMACY: "process", COMPLETED: "finish" };

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
              {props.hideMedicationPlanButton ? (
                <Button type="primary" onClick={() => history.back()} icon={<CaretLeftOutlined />} size="small">
                  {t("translation:general.back")}
                </Button>
              ) : (
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
        {props.orderState && (
          <Col span={17} style={{ display: "flex", alignItems: "center" }}>
            <Steps
              items={[
                {
                  title: t("translation:order.steps.caregiver"),
                  status: caregiverSteps[props.orderState],
                  icon: props.orderState === OrderState.CAREGIVER ? <LoadingOutlined /> : <UserOutlined />,
                },
                {
                  title: t("translation:order.steps.doctor"),
                  status: (doctorSteps as any)[props.orderState] ?? "wait",
                  icon: [OrderState.BOTH, OrderState.DOCTOR].includes(props.orderState) ? (
                    <LoadingOutlined />
                  ) : (
                    <SolutionOutlined />
                  ),
                },
                {
                  title: t("translation:order.steps.pharmacy"),
                  status: (pharmacySteps as any)[props.orderState] ?? "wait",
                  icon: [OrderState.BOTH, OrderState.PHARMACY].includes(props.orderState) ? (
                    <LoadingOutlined />
                  ) : (
                    <MedicineBoxOutlined />
                  ),
                },
              ]}
            />
          </Col>
        )}
      </Row>
    </Card>
  );
};
