import { Table } from "antd";
import { Patient } from "core/src/interface/linca/Patient";

interface OrderTableProps {
  patient: Patient;
  title: JSX.Element;
}

export const OrderTable = (props: OrderTableProps) => {
  return (
    <Table
      dataSource={[{}]}
      style={{ minHeight: "100%" }}
      pagination={{ simple: true }}
      size="small"
      title={() => props.title}
      bordered
    />
  );
};
