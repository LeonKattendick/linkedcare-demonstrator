import { Divider, Form, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import medicationData from "../../../../data/medication.json";
import { ModalProps } from "../../../../interface/ModalProps";
import { BaseMedicationRequest } from "../../../../interface/linca/BaseMedicationRequest";
import { Dosage } from "../../../../interface/linca/fhir/Dosage";
import { ExternalReference } from "../../../../interface/linca/fhir/Reference";
import { DoctorSelect } from "./DoctorSelect";
import { MedicationSelect } from "./MedicationSelect";
import { PharmacySelect } from "./PharmacySelect";
import { SelectFromMedicationPlan } from "./SelectFromMedicationPlan";
import { SelectFromOtherOrders } from "./SelectFromOtherOrders";
import { SequenceTable } from "./SequenceTable";

interface MedicationModalProps extends ModalProps {
  isCreate: boolean;
  request?: BaseMedicationRequest;
  saveRequest: (r: BaseMedicationRequest) => void;
}

interface FormResult {
  medicationIndex: string;
  sequences: Dosage[];
  doctorIdentifier: string;
  pharmacyIdentifier: string;
}

export const MedicationModal = (props: MedicationModalProps) => {
  const { t } = useTranslation();

  const [form] = useForm();

  useEffect(() => {
    if (!props.open) return;

    form.setFieldsValue({
      medicationIndex: props.request?.medication.concept.coding[0]?.code,
      sequences: props.request?.dosageInstruction,
      doctorIdentifier: (props.request?.performer as ExternalReference)?.identifier?.value,
      pharmacyIdentifier: (props.request?.dispenseRequest?.dispenser as ExternalReference)?.identifier?.value,
    });
  }, [props.open]);

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleOk = () => {
    form.validateFields().then((res: FormResult) => {
      if (!props.request) return;

      const medication = medicationData.find((v) => v.code === res.medicationIndex);
      if (!medication) return;

      props.saveRequest({
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
      destroyOnClose
    >
      {props.isCreate && (
        <>
          <Divider orientation="left">{t("translation:order.medicationTable.modal.selectsDivider")}</Divider>
          <SelectFromOtherOrders />
          <SelectFromMedicationPlan />
        </>
      )}
      <Form form={form}>
        <Divider orientation="left">{t("translation:order.medicationTable.modal.responsibleDivider")}</Divider>
        <DoctorSelect />
        <PharmacySelect />
        <Divider orientation="left">{t("translation:order.medicationTable.modal.detailsDivider")}</Divider>
        <MedicationSelect />
        <SequenceTable form={form} />
      </Form>
    </Modal>
  );
};
