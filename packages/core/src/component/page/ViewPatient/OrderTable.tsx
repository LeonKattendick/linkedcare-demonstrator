import { EyeOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Patient } from "../../../interface/linca/Patient";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";

interface OrderTableProps {
  patient: Patient;
  orders: RequestOrchestration[];
  isOrdersLoading: boolean;
}

export const OrderTable = ({ patient, orders, isOrdersLoading }: OrderTableProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Table
      dataSource={orders}
      pagination={{ simple: true, pageSize: 11 }}
      rowKey={(v) => v.id!}
      size="small"
      loading={isOrdersLoading}
      bordered
    >
      <Table.Column title="#" dataIndex="id" />
      <Table.Column
        title={t("translation:viewPatient.orders.date")}
        render={(_, record: RequestOrchestration) => dayjs(record.meta?.lastUpdated).format("DD.MM.YYYY HH:mm")}
      />
      <Table.Column title={t("translation:viewPatient.orders.status")} dataIndex="status" />
      <Table.Column
        title={t("translation:general.actions")}
        render={(_, record: RequestOrchestration) => (
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => navigate(`/order/${patient.id}/${record.id}`)}
          />
        )}
      />
    </Table>
  );
};
