import { Patient } from "core/src/interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { OrderTable } from "./OrderTable";

interface ActiveOrdersProps {
  patient: Patient;
  orders: RequestOrchestration[];
  isOrderLoading: boolean;
}

export const ActiveOrders = ({ patient, orders, isOrderLoading }: ActiveOrdersProps) => {
  return (
    <OrderTable
      patient={patient}
      orders={orders.filter((v) => v.status === "active")}
      isOrdersLoading={isOrderLoading}
    />
  );
};
