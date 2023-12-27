import { Patient } from "core/src/interface/linca/Patient";
import { useGetAllRequestOrchestrationsByPatient } from "../../../hook/useGetAllRequestOrchestrationsByPatient";
import { OrderTable } from "./OrderTable";

interface CompletedOrdersProps {
  patient: Patient;
}

export const CompletedOrders = ({ patient }: CompletedOrdersProps) => {
  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrationsByPatient(patient.id);

  return (
    <OrderTable
      patient={patient}
      orders={orchestrations.filter((v) => v.status !== "active")}
      isOrdersLoading={isOrchestrationsLoading}
    />
  );
};
