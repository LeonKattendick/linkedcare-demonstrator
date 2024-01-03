import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Table, Tooltip } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useGetAllValidMedicationRequests } from "../../hook/filter/useGetAllValidMedicationRequests";
import { useGetAllPatients } from "../../hook/query/useGetAllPatients";
import { BaseMedicationRequest } from "../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../interface/linca/Patient";
import { RequestOrchestration } from "../../interface/linca/RequestOrchestration";
import { InternalReference } from "../../interface/linca/fhir/Reference";
import { requestIsFromOrchestration } from "../../util/matchingUtil";
import { renderAddress, renderBirthDate } from "../../util/renderUtil";

interface OrderWithRequests {
  order: RequestOrchestration;
  patient?: Patient;
  requests: BaseMedicationRequest[];
}

interface OrdersProps {
  orders: RequestOrchestration[];
  isOrdersLoading: boolean;
  showClickablePatient?: boolean;
}

export const Orders = ({ orders, isOrdersLoading, showClickablePatient }: OrdersProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { requests, isRequestsLoading } = useGetAllValidMedicationRequests();
  const { patients, isPatientsLoading } = useGetAllPatients();

  const ordersWithRequests: OrderWithRequests[] = orders.map((v) => {
    const orderRequests = requests.filter((w) => requestIsFromOrchestration(w, v));
    return {
      order: v,
      patient: patients.find((v) => (orderRequests[0].subject as InternalReference).reference === `Patient/${v.id}`),
      requests: orderRequests,
    };
  });

  return (
    <Card style={{ height: "100%" }}>
      <Table
        dataSource={ordersWithRequests}
        loading={isOrdersLoading || isRequestsLoading || isPatientsLoading}
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
          sorter={(a, b) => a.order.status.localeCompare(b.order.status)}
        />
        <Table.Column
          title={t("translation:orders.patient")}
          render={(_, record: OrderWithRequests) =>
            showClickablePatient ? (
              <Tooltip title={t("translation:orders.tooltipViewPatient")}>
                <Link to={`/patient/${record.patient?.id}`}>{record.patient?.name[0]?.text}</Link>
              </Tooltip>
            ) : (
              record.patient?.name[0].text
            )
          }
          sorter={(a, b) => a.order.status.localeCompare(b.order.status)}
        />
        <Table.Column
          title={t("translation:orders.gender")}
          render={(_, record: OrderWithRequests) => t(`general.gender.${record.patient?.gender}`)}
          sorter={(a, b) => a.patient!.gender.localeCompare(b.patient!.gender)}
        />
        <Table.Column
          title={t("translation:orders.birthDate")}
          render={(_, record: OrderWithRequests) => renderBirthDate(record.patient?.birthDate)}
          sorter={(a, b) => (dayjs(a.patient?.birthDate).isBefore(dayjs(b.patient?.birthDate)) ? -1 : 1)}
        />
        <Table.Column
          title={t("translation:orders.address")}
          render={(_, record: OrderWithRequests) => renderAddress(record.patient?.address[0])}
          sorter={(a, b) => renderAddress(a.patient?.address[0]).localeCompare(renderAddress(b.patient?.address[0]))}
        />
        <Table.Column
          title={t("translation:general.actions")}
          render={(_, record: OrderWithRequests) => (
            <Tooltip title={t("translation:orders.tooltipView")}>
              <Button
                type="primary"
                icon={<EyeOutlined />}
                size="small"
                onClick={() => navigate(`/order/${record.patient?.id}/${record.order.id}`)}
              />
            </Tooltip>
          )}
        />
      </Table>
    </Card>
  );
};
