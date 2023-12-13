import { Card, Spin } from "antd";

export const Loading = () => {
  return (
    <Card style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Spin size="large" />
    </Card>
  );
};
