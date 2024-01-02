import { Modal, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMedicationRequestApiAdapter } from "../../../hook/adapter/useMedicationRequestApiAdapter";
import { useGetAllMedicationRequestsByPatient } from "../../../hook/query/useGetAllMedicationRequestsByPatient";
import { ModalProps } from "../../../interface/ModalProps";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";

interface DeclineStatusModalProps extends ModalProps {
  requests: BaseMedicationRequest[];
}

export const DeclineStatusModal = (props: DeclineStatusModalProps) => {
  const { t } = useTranslation();
  const requestApi = useMedicationRequestApiAdapter();
  const { invalidateAllMedicationRequests } = useGetAllMedicationRequestsByPatient();

  const [reason, setReason] = useState<"ended" | "stopped" | "entered-in-error">();

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleDecline = async () => {
    if (!reason) return;

    for (const request of props.requests) {
      await requestApi.declineRequestWithInfo(request, reason);
    }

    invalidateAllMedicationRequests();
    handleCancel();
  };

  return (
    <Modal
      open={props.open}
      onCancel={handleCancel}
      title={t("translation:order.declineModal.title")}
      okButtonProps={{ danger: true, disabled: !reason }}
      okText={t("translation:order.declineModal.ok")}
      onOk={handleDecline}
      destroyOnClose
    >
      <Select
        style={{ width: "100%" }}
        options={[
          { value: "ended", label: t("translation:order.declineModal.ended") },
          { value: "stopped", label: t("translation:order.declineModal.stopped") },
          { value: "entered-in-error", label: t("translation:order.declineModal.error") },
        ]}
        value={reason}
        onSelect={setReason}
        placeholder={t("translation:order.declineModal.placeholder")}
      />
    </Modal>
  );
};
