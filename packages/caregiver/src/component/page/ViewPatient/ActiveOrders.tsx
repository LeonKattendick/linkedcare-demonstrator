import { FileAddOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { OrderTable } from "./OrderTable";

interface ActiveOrdersProps {
  patient: Patient;
}

export const ActiveOrders = ({ patient }: ActiveOrdersProps) => {
  return (
    <Card style={{ height: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <OrderTable patient={patient} />
        <Button type="primary" icon={<FileAddOutlined />}>
          NEU BESTELLUNG
        </Button>
      </Space>
    </Card>
  );
};
