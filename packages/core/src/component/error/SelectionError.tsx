import { LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Error } from "./Error";

interface SelectionErrorProps {
  extra: JSX.Element;
}

export const SelectionError = (props: SelectionErrorProps) => {
  const { t } = useTranslation();

  return <Error title={t("login.title")} subtitle={t("login.subtitle")} icon={<LockOutlined />} extra={props.extra} />;
};
