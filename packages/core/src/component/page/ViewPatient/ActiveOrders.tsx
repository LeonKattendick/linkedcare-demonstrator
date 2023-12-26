import { Patient } from "core/src/interface/linca/Patient";
import { useGetAllRequestOrchestrations } from "../../../hook/useGetAllRequestOrchestrations";
import { OrderTable } from "./OrderTable";

interface ActiveOrdersProps {
  patient: Patient;
}

export const ActiveOrders = ({ patient }: ActiveOrdersProps) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();

  return <OrderTable patient={patient} orders={orchestrations} isOrdersLoading={isOrchestrationsLoading} />;
};
