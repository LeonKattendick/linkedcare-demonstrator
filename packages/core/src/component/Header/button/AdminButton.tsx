import { ToolOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminModal } from "../modal/AdminModal";

export const AdminButton = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminModal open={open} setOpen={setOpen} />
      <Tooltip title={t("admin.title")}>
        <Button icon={<ToolOutlined />} onClick={() => setOpen(true)} />
      </Tooltip>
    </>
  );
};
