import { FileAddOutlined } from "@ant-design/icons";
import { Button, Card, Flex } from "antd";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Patient } from "../../../interface/linca/Patient";
import { ActiveOrders } from "./ActiveOrders";
import { CompletedOrders } from "./CompletedOrders";
import { PatientInfo } from "./PatientInfo";

interface ViewPatientProps {
  patient: Patient;
}

export const ViewPatient = ({ patient }: ViewPatientProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState("active");

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle patient={patient} title={t("translation:viewPatient.title")} />
      <Flex gap={16} style={{ height: "100%" }}>
        <PatientInfo patient={patient} />
        <Card
          style={{ height: "100%", width: "100%" }}
          tabList={[
            { key: "active", label: t("translation:viewPatient.orders.title") },
            { key: "completed", label: t("translation:viewPatient.orders.completedTitle") },
          ]}
          tabBarExtraContent={
            <Button type="primary" icon={<FileAddOutlined />} onClick={() => navigate(`/create/${patient.id}`)}>
              {t("translation:viewPatient.orders.add")}
            </Button>
          }
          activeTabKey={activeKey}
          onTabChange={setActiveKey}
        >
          {activeKey === "active" ? <ActiveOrders patient={patient} /> : <CompletedOrders patient={patient} />}
        </Card>
      </Flex>
    </Flex>
  );
};
