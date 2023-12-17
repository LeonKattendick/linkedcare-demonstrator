import { Card } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { useTranslation } from "react-i18next";
import { OrderTable } from "./OrderTable";

interface CompletedOrdersProps {
  patient: Patient;
}

export const CompletedOrders = ({ patient }: CompletedOrdersProps) => {
  const { t } = useTranslation();

  return (
    <Card style={{ height: "100%" }} title={t("translation:viewPatient.activeOrders.title")}>
      <OrderTable patient={patient} />
    </Card>
  );
};
