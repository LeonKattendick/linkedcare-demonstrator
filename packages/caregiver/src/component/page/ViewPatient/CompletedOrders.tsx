import { Card } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { OrderTable } from "./OrderTable";

interface CompletedOrdersProps {
  patient: Patient;
}

export const CompletedOrders = ({ patient }: CompletedOrdersProps) => {
  return (
    <Card style={{ height: "100%" }}>
      <OrderTable patient={patient} />
    </Card>
  );
};
