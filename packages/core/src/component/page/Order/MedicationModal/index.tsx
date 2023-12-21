import { Divider, Form, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";
import medicationData from "../../../../data/medication.json";
import { ModalProps } from "../../../../interface/ModalProps";
import { BaseMedicationRequest } from "../../../../interface/linca/BaseMedicationRequest";
import { Dosage } from "../../../../interface/linca/fhir/Dosage";
import { MedicationSelect } from "./MedicationSelect";
import { SelectFromMedicationPlan } from "./SelectFromMedicationPlan";
import { SelectFromOtherOrders } from "./SelectFromOtherOrders";
import { SequenceTable } from "./SequenceTable";

interface MedicationModalProps extends ModalProps {
  isCreate: boolean;
  request?: BaseMedicationRequest;
  setRequest: (r: BaseMedicationRequest) => void;
}

export const MedicationModal = (props: MedicationModalProps) => {
  const { t } = useTranslation();

  const [form] = useForm();

  const handleCancel = () => {
    form.resetFields();
    props.setOpen(false);
  };

  const handleOk = () => {
    form.validateFields().then((res: { medicationIndex: number; sequences: Dosage[] }) => {
      if (!props.request) return;

      const medication = medicationData[res.medicationIndex];
      props.setRequest({
        ...props.request,
        medication: {
          concept: {
            coding: [
              {
                system: "https://termgit.elga.gv.at/CodeSystem-asp-liste",
                code: medication.code,
                display: `${medication.approvalName} (${medication.dosageForm}, ${medication.dosageSize})`,
              },
            ],
          },
        },
        dosageInstruction: [...res.sequences],
      });
      handleCancel();
    });
  };

  return (
    <Modal
      open={props.open}
      onCancel={handleCancel}
      title={t(
        props.isCreate
          ? "translation:order.medicationTable.modal.createTitle"
          : "translation:order.medicationTable.modal.addTitle"
      )}
      width="70%"
      okText={t("translation:general.save")}
      onOk={handleOk}
    >
      {!props.isCreate && (
        <>
          <Divider orientation="left">{t("translation:order.medicationTable.modal.selectsDivider")}</Divider>
          <SelectFromOtherOrders />
          <SelectFromMedicationPlan />
        </>
      )}
      <Divider orientation="left">{t("translation:order.medicationTable.modal.detailsDivider")}</Divider>
      <Form form={form}>
        <MedicationSelect />
        <SequenceTable />
      </Form>
    </Modal>
  );
};
