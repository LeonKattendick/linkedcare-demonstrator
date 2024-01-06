import { Button, Divider, Form, Modal, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import medicationData from "../../../../data/medication.json";
import { ModalProps } from "../../../../interface/ModalProps";
import { BaseMedicationRequest } from "../../../../interface/linca/BaseMedicationRequest";
import { Patient } from "../../../../interface/linca/Patient";
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
  patient: Patient;
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

  const [sequences, setSequences] = useState<Dosage[]>([]);

  useEffect(() => {
    if (!props.open) return;

    form.setFieldsValue({
      medicationIndex: props.request?.medication.concept.coding[0]?.code,
      doctorIdentifier: (props.request?.performer[0] as ExternalReference)?.identifier?.value,
      pharmacyIdentifier: (props.request?.dispenseRequest?.dispenser as ExternalReference)?.identifier?.value,
    });
    setSequences(structuredClone(props.request?.dosageInstruction ?? []));
  }, [props.open]);

  useEffect(() => {
    form.setFieldValue("sequences", sequences);
  }, [sequences]);

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleSelectPreset = (medicationCode: string, dosages: Dosage[]) => {
    form.setFieldsValue({
      medicationIndex: medicationCode,
    });
    setSequences(structuredClone(dosages));
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
          <Space direction="vertical">
            <SelectFromOtherOrders patient={props.patient} selectPreset={handleSelectPreset} />
            <SelectFromMedicationPlan selectPreset={handleSelectPreset} />
          </Space>
        </>
      )}
      <Form form={form}>
        <Divider orientation="left">{t("translation:order.medicationTable.modal.responsibleDivider")}</Divider>
        <DoctorSelect isReadOnly={props.state === MedicationModalState.VIEW} />
        <PharmacySelect isReadOnly={props.state === MedicationModalState.VIEW} />
        <Divider orientation="left">{t("translation:order.medicationTable.modal.detailsDivider")}</Divider>
        <MedicationSelect isReadOnly={props.state === MedicationModalState.VIEW} />
        <SequenceTable
          sequences={sequences}
          setSequences={setSequences}
          isReadOnly={props.state === MedicationModalState.VIEW}
        />
      </Form>
    </Modal>
  );
};
