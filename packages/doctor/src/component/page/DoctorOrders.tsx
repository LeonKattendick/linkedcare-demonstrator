import { Orders } from "core/src/component/page/Orders";
import { useGetAllRequestOrchestrations } from "core/src/hook/useGetAllRequestOrchestrations";

export const DoctorOrders = () => {
  const { orchestrations } = useGetAllRequestOrchestrations();

  return <Orders orders={orchestrations} />;
};
