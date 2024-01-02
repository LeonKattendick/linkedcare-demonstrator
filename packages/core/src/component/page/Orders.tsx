import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Table } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useGetAllValidMedicationRequests } from "../../hook/filter/useGetAllValidMedicationRequests";
import { BaseMedicationRequest } from "../../interface/linca/BaseMedicationRequest";
import { RequestOrchestration } from "../../interface/linca/RequestOrchestration";
import { InternalReference } from "../../interface/linca/fhir/Reference";
import { requestIsFromOrchestration } from "../../util/matchingUtil";

interface OrderWithRequests {
  order: RequestOrchestration;
  requests: BaseMedicationRequest[];
}

interface OrdersProps {
  orders: RequestOrchestration[];
  isOrdersLoading: boolean;
}

export const Orders = ({ orders, isOrdersLoading }: OrdersProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { requests, isRequestsLoading } = useGetAllValidMedicationRequests();

  const ordersWithRequests: OrderWithRequests[] = orders.map((v) => ({
    order: v,
    requests: requests.filter((w) => requestIsFromOrchestration(w, v)),
  }));

  return (
    <Card style={{ height: "100%" }}>
      <Table
        dataSource={ordersWithRequests}
        loading={isOrdersLoading || isRequestsLoading}
        size="middle"
        bordered
        rowKey={(v) => v.order.id!}
      >
        <Table.Column
          title="#"
          render={(_, record: OrderWithRequests) => record.order.id}
          sorter={(a: OrderWithRequests, b: OrderWithRequests) => a.order.id!.localeCompare(b.order.id!)}
        />
        <Table.Column
          title={t("translation:orders.date")}
          render={(_, record: OrderWithRequests) => dayjs(record.order.meta?.lastUpdated).format("DD.MM.YYYY HH:mm")}
          sorter={(a, b) => (dayjs(a.order.meta?.lastUpdated).isBefore(dayjs(b.order.meta?.lastUpdated)) ? -1 : 1)}
        />
        <Table.Column
          title={t("translation:orders.status")}
          render={(_, record: OrderWithRequests) => record.order.status}
          sorter={(a: OrderWithRequests, b: OrderWithRequests) => a.order.status.localeCompare(b.order.status)}
        />
        <Table.Column
          title={t("translation:general.actions")}
          render={(_, record: OrderWithRequests) => (
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => {
                const patientId = (record.requests[0].subject as InternalReference).reference?.replace("Patient/", "");
                navigate(`/order/${patientId}/${record.order.id}`);
              }}
            />
          )}
        />
      </Table>
    </Card>
  );
};
