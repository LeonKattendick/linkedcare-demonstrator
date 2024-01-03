import { Button, Divider, Form, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import medicationData from "../../../../data/medication.json";
import { ModalProps } from "../../../../interface/ModalProps";
import { BaseMedicationRequest } from "../../../../interface/linca/BaseMedicationRequest";
import { Dosage } from "../../../../interface/linca/fhir/Dosage";
import { ExternalReference } from "../../../../interface/linca/fhir/Reference";
import { doctorModels } from "../../../../model/doctorModels";
import { pharmacyModels } from "../../../../model/pharmacyModels";
import { DoctorSelect } from "./DoctorSelect";
import { MedicationSelect } from "./MedicationSelect";
import { PharmacySelect } from "./PharmacySelect";
import { SelectFromMedicationPlan } from "./SelectFromMedicationPlan";
import { SelectFromOtherOrders } from "./SelectFromOtherOrders";
import { SequenceTable } from "./SequenceTable";

export enum MedicationModalState {
  VIEW = -2,
  CREATE = -1,
  EDIT = 0,
}

interface MedicationModalProps extends ModalProps {
  state: MedicationModalState;
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
      doctorIdentifier: (props.request?.performer[0] as ExternalReference)?.identifier?.value,
      pharmacyIdentifier: (props.request?.dispenseRequest?.dispenser as ExternalReference)?.identifier?.value,
    });
  }, [props.open]);

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleSave = () => {
    form.validateFields().then((res: FormResult) => {
      if (!props.request) return;

      const medication = medicationData.find((v) => v.code === res.medicationIndex);
      if (!medication) return;

      const doctor = doctorModels.find((v) => v.identifier[0].value === res.doctorIdentifier);
      if (!doctor) return;

      const pharmacy = pharmacyModels.find((v) => v.identifier[0].value === res.pharmacyIdentifier);

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
        performer: [
          {
            identifier: doctor.identifier[0],
            display: doctor.name[0].text,
          },
        ],
        dispenseRequest: pharmacy
          ? {
              dispenser: {
                identifier: pharmacy.identifier[0],
                display: pharmacy.name,
              },
            }
          : undefined,
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
        props.state === MedicationModalState.CREATE
          ? "translation:order.medicationTable.modal.createTitle"
          : props.state === MedicationModalState.EDIT
          ? "translation:order.medicationTable.modal.editTitle"
          : "translation:order.medicationTable.modal.viewTitle"
      )}
      width="70%"
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {props.state === MedicationModalState.VIEW ? t("translation:general.close") : t("translation:general.cancel")}
        </Button>,
        props.state !== MedicationModalState.VIEW && (
          <Button type="primary" key="save" onClick={handleSave}>
            {t("translation:general.save")}
          </Button>
        ),
      ]}
      destroyOnClose
    >
      {props.state === MedicationModalState.CREATE && (
        <>
          <Divider orientation="left">{t("translation:order.medicationTable.modal.selectsDivider")}</Divider>
          <SelectFromOtherOrders />
          <SelectFromMedicationPlan />
        </>
      )}
      <Form form={form}>
        <Divider orientation="left">{t("translation:order.medicationTable.modal.responsibleDivider")}</Divider>
        <DoctorSelect isReadOnly={props.state === MedicationModalState.VIEW} />
        <PharmacySelect isReadOnly={props.state === MedicationModalState.VIEW} />
        <Divider orientation="left">{t("translation:order.medicationTable.modal.detailsDivider")}</Divider>
        <MedicationSelect isReadOnly={props.state === MedicationModalState.VIEW} />
        <SequenceTable form={form} isReadOnly={props.state === MedicationModalState.VIEW} />
      </Form>
    </Modal>
  );
};
