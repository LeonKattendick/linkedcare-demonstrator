import { Card, Result } from "antd";
import { ResultStatusType } from "antd/lib/result";

interface ErrorProps {
  title: string;
  subtitle: string;
  status?: ResultStatusType;
  icon?: JSX.Element;
  extra?: JSX.Element;
}

export const Error = (props: ErrorProps) => {
  return (
    <Card
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Result
        title={props.title}
        subTitle={props.subtitle}
        status={props.status}
        icon={props.icon}
        extra={props.extra}
      />
    </Card>
  );
};
