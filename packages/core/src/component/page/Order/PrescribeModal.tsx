import { CheckOutlined } from "@ant-design/icons";
import { Input, Modal, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMedicationRequestApiAdapter } from "../../../hook/adapter/useMedicationRequestApiAdapter";
import { useGetAllMedicationRequestsByPatient } from "../../../hook/query/useGetAllMedicationRequestsByPatient";
import { usePermissions } from "../../../hook/usePermissions";
import { ModalProps } from "../../../interface/ModalProps";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";

interface PrescribeModalProps extends ModalProps {
  requests: BaseMedicationRequest[];
}

export const PrescribeModal = (props: PrescribeModalProps) => {
  const { t } = useTranslation();
  const perms = usePermissions();
  const requestApi = useMedicationRequestApiAdapter();

  const { invalidateAllMedicationRequests } = useGetAllMedicationRequestsByPatient();

  const [rezeptId, setRezeptId] = useState("");
  const [medId, setMedId] = useState("");

  const handleCancel = () => {
    setRezeptId("");
    setMedId("");
    props.setOpen(false);
  };

  const handlePrescribe = async () => {
    for (const request of props.requests) {
      if (perms.canPrescribeMedication(request)) await requestApi.prescribeRequestWithInfo(request, rezeptId, medId);
    }
    invalidateAllMedicationRequests();
    handleCancel();
  };

  return (
    <Modal
      open={props.open}
      onCancel={handleCancel}
      title={t("translation:order.prescribeModal.title")}
      destroyOnClose
      okButtonProps={{ icon: <CheckOutlined /> }}
      okText={t("translation:order.prescribeModal.ok", { amount: props.requests.length })}
      onOk={handlePrescribe}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          value={rezeptId}
          onChange={(e) => setRezeptId(e.target.value)}
          placeholder={t("translation:order.prescribeModal.recipe")}
        />
        <Input
          value={medId}
          onChange={(e) => setMedId(e.target.value)}
          placeholder={t("translation:order.prescribeModal.med")}
        />
      </Space>
    </Modal>
  );
};
