import { Table } from "antd";
import { Patient } from "core/src/interface/linca/Patient";

interface OrderTableProps {
  patient: Patient;
}

export const OrderTable = ({}: OrderTableProps) => {
  return <Table dataSource={[{}]} pagination={{ simple: true }} size="small" />;
};
