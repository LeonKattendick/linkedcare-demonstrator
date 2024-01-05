import { Orders } from "core/src/component/page/Orders";
import { useGetRelevantRequestOrchestrations } from "../../hook/useGetRelevantRequestOrchestrations";

const PharmacyOrders = () => {
  const { orchestrations, isOrchestrationsLoading } = useGetRelevantRequestOrchestrations();

  return <Orders orders={orchestrations} isOrdersLoading={isOrchestrationsLoading} />;
};

export default PharmacyOrders;
