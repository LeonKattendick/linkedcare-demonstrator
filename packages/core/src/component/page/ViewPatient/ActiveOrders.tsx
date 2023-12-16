import { FileAddOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { OrderTable } from "./OrderTable";

interface ActiveOrdersProps {
  patient: Patient;
}

export const ActiveOrders = ({ patient }: ActiveOrdersProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card style={{ height: "100%" }}>
      <OrderTable
        patient={patient}
        title={
          <>
            {t("translation:viewPatient.activeOrders.title")}
            <Button
              type="primary"
              size="small"
              icon={<FileAddOutlined />}
              style={{ float: "right" }}
              onClick={() => navigate(`/create/${patient.id}`)}
            >
              {t("translation:viewPatient.activeOrders.add")}
            </Button>
          </>
        }
      />
    </Card>
  );
};
