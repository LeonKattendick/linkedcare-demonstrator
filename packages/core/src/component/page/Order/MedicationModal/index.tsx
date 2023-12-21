import { Divider, Form, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";
import medicationData from "../../../../data/medication.json";
import { ModalProps } from "../../../../interface/ModalProps";
import { BaseMedicationRequest } from "../../../../interface/linca/BaseMedicationRequest";
import { Dosage } from "../../../../interface/linca/fhir/Dosage";
import { SelectFromMedicationPlan } from "./SelectFromMedicationPlan";
import { SelectFromOtherOrders } from "./SelectFromOtherOrders";
import { SequenceTable } from "./SequenceTable";

interface MedicationModalProps extends ModalProps {
  isCreate: boolean;
  request?: BaseMedicationRequest;
  setRequest: (r: BaseMedicationRequest) => void;
}

const compare = (input: string, label: string) => {
  return input.split(" ").filter((v) => !label.includes(v)).length === 0;
};

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
      width="60%"
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
        <Form.Item
          name="medicationIndex"
          label={t("translation:order.medicationTable.modal.medication")}
          hasFeedback
          labelCol={{ span: 4 }}
          labelAlign="left"
          rules={[{ required: true, message: t("translation:order.medicationTable.modal.errorNoMedication") }]}
        >
          <Select
            options={medicationData.map((v, i) => ({
              value: i,
              label: `${v.approvalName} (${v.dosageForm}, ${v.dosageSize})`,
            }))}
            style={{ width: "100%" }}
            showSearch
            filterOption={(input, option) => compare(input.toLowerCase(), (option?.label ?? "").toLowerCase())}
          />
        </Form.Item>
        <SequenceTable />
      </Form>
    </Modal>
  );
};
