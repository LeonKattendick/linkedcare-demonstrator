import { LockOutlined } from "@ant-design/icons";
import { theme } from "antd";
import { useTranslation } from "react-i18next";
import { Error } from ".";

interface SelectionErrorProps {
  extra: JSX.Element;
}

export const SelectionError = (props: SelectionErrorProps) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  return (
    <Error
      title={t("translation:login.title")}
      subtitle={t("translation:login.subtitle")}
      icon={<LockOutlined style={{ color: token.colorPrimary }} />}
      extra={props.extra}
    />
  );
};
