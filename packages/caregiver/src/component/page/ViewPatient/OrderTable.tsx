import { Table } from "antd";
import { Patient } from "core/src/interface/linca/Patient";

interface OrderTableProps {
  patient: Patient;
}

export const OrderTable = ({ patient }: OrderTableProps) => {
  return <Table />;
};
