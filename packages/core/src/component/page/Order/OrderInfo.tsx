import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Popover, Row, Space, theme } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { RequestOrchestration } from "../../../interface/linca/RequestOrchestration";
import { ExternalReference } from "../../../interface/linca/fhir/Reference";

export const OrderInfo = ({ order }: { order: RequestOrchestration | null }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  if (!order) return t("translation:editOrder.title");

  return (
    <Space>
      {t("translation:editOrder.title")}
      <Popover
        title={
          <div style={{ width: 300, textAlign: "center" }}>{t("translation:order.info.title", { id: order.id })}</div>
        }
        content={
          <>
            <Row>
              <Col span={10}>Status:</Col>
              <Col span={14}>
                <b>{order.status}</b>
              </Col>
            </Row>
            <Row>
              <Col span={10}>{t("translation:order.info.intent")}:</Col>
              <Col span={14}>
                <b>{order.intent}</b>
              </Col>
            </Row>
            <Row>
              <Col span={10}>{t("translation:order.info.lastUpdate")}:</Col>
              <Col span={14}>
                <b>{dayjs(order.meta?.lastUpdated).format("DD.MM.YYYY HH:mm")}</b>
              </Col>
            </Row>
            <Row>
              <Col span={10}>{t("translation:order.info.creator")}:</Col>
              <Col span={14}>
                <b>{(order.subject as ExternalReference).display}</b>
              </Col>
            </Row>
          </>
        }
        placement="right"
      >
        <InfoCircleOutlined style={{ color: token.colorPrimary }} />
      </Popover>
    </Space>
  );
};
