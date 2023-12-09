import { LockOutlined } from "@ant-design/icons";
import { Card, Result } from "antd";
import { useTranslation } from "react-i18next";

interface SelectionErrorProps {
  extra: JSX.Element;
}

export const SelectionError = (props: SelectionErrorProps) => {
  const { t } = useTranslation();

  return (
    <Card
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Result title={t("login.title")} subTitle={t("login.subtitle")} icon={<LockOutlined />} extra={props.extra} />
    </Card>
  );
};
