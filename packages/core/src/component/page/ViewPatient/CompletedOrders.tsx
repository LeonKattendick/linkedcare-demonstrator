import { Patient } from "core/src/interface/linca/Patient";
import { useGetAllRequestOrchestrations } from "../../../hook/useGetAllRequestOrchestrations";
import { OrderTable } from "./OrderTable";

interface CompletedOrdersProps {
  patient: Patient;
}

export const CompletedOrders = ({ patient }: CompletedOrdersProps) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrations();

  return <OrderTable patient={patient} orders={orchestrations} isOrdersLoading={isOrchestrationsLoading} />;
};
