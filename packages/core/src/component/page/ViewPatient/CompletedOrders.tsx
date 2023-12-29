import { Patient } from "core/src/interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { OrderTable } from "./OrderTable";

interface CompletedOrdersProps {
  patient: Patient;
  orders: RequestOrchestration[];
  isOrderLoading: boolean;
}

export const CompletedOrders = ({ patient, orders, isOrderLoading }: CompletedOrdersProps) => {
  return (
    <OrderTable
      patient={patient}
      orders={orders.filter((v) => v.status !== "active")}
      isOrdersLoading={isOrderLoading}
    />
  );
};
