import { Orders } from "core/src/component/page/Orders";
import { useGetRelevantRequestOrchestrations } from "../../hook/useGetRelevantRequestOrchestrations";

const DoctorOrders = () => {
  const { orchestrations, isOrchestrationsLoading } = useGetRelevantRequestOrchestrations();

  return <Orders orders={orchestrations} isOrdersLoading={isOrchestrationsLoading} showClickablePatient />;
};

export default DoctorOrders;
