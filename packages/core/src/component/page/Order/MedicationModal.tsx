import { Modal } from "antd";
import { ModalProps } from "../../../interface/ModalProps";
import { BaseMedicationRequest } from "../../../interface/linca/BaseMedicationRequest";

interface MedicationModalProps extends ModalProps {
  request?: BaseMedicationRequest;
  setRequest: (r: BaseMedicationRequest) => void;
}

export const MedicationModal = (props: MedicationModalProps) => {
  return (
    <Modal open={props.open} onCancel={() => props.setOpen(false)}>
      test
    </Modal>
  );
};
