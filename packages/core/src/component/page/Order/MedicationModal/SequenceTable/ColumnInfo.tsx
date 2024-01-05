import { InfoCircleOutlined } from "@ant-design/icons";
import { Space, Tooltip, theme } from "antd";

export const ColumnInfo = ({ title, tooltip }: { title: string; tooltip: string }) => {
  const { token } = theme.useToken();

  return (
    <Space>
      {title}
      <Tooltip title={tooltip}>
        <InfoCircleOutlined style={{ color: token.colorPrimary }} />
      </Tooltip>
    </Space>
  );
};
