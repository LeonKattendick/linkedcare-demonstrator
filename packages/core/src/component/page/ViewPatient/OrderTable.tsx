import { EyeOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
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
      <Table.Column
        title="#"
        dataIndex="id"
        sorter={(a: RequestOrchestration, b: RequestOrchestration) => a.id!.localeCompare(b.id!)}
      />
      <Table.Column
        title={t("translation:viewPatient.orders.date")}
        render={(_, record: RequestOrchestration) => dayjs(record.meta?.lastUpdated).format("DD.MM.YYYY HH:mm")}
        sorter={(a, b) => (dayjs(a.meta?.lastUpdated).isBefore(dayjs(b.meta?.lastUpdated)) ? -1 : 1)}
      />
      <Table.Column
        title={t("translation:viewPatient.orders.status")}
        dataIndex="status"
        sorter={(a: RequestOrchestration, b: RequestOrchestration) => a.status.localeCompare(b.status)}
      />
      <Table.Column
        title={t("translation:general.actions")}
        render={(_, record: RequestOrchestration) => (
          <Tooltip title={t("translation:viewPatient.orders.tooltipView")}>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => navigate(`/order/${patient.id}/${record.id}`)}
            />
          </Tooltip>
        )}
      />
    </Table>
  );
};
