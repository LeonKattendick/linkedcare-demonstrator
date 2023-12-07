import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { ModalProps } from "../../interface/ModalProps";

export const AdminModal = (props: ModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={props.open} onCancel={() => props.setOpen(false)} title={t("admin.title")} footer={null}>
      test
    </Modal>
  );
};
