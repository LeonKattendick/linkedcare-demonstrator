import { Card } from "antd";
import { RequestOrchestration } from "../../interface/linca/RequestOrchestration";

interface OrdersProps {
  orders: RequestOrchestration[];
}

export const Orders = (props: OrdersProps) => {
  return <Card style={{ height: "100%" }}>test</Card>;
};
