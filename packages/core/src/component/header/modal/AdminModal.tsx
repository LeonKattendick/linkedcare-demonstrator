import { App, Button, Divider, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ModalProps } from "../../../interface/ModalProps";
import { Patient } from "../../../interface/linca/Patient";
import { patientModels } from "../../../model/patientModels";
import { createPatient } from "../../../service/patientService";

export const AdminModal = (props: ModalProps) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleCreatePatient = (patient: Patient) => {
    createPatient(patient)
      .then((res) => {
        const patient = res.data as Patient;
        message.success(t("admin.createPatientSuccess", { name: patient.name[0].text, id: patient.id }));
      })
      .catch(() => message.error(t("admin.createPatientError", { name: patient.name[0].text })));
  };

  return (
    <>
      <Modal open={props.open} onCancel={() => props.setOpen(false)} title={t("admin.title")} footer={null} width="40%">
        <Divider orientation="left">{t("admin.createPatients")}</Divider>
        <Space>
          {patientModels.map((v, i) => (
            <Button type="primary" key={i} onClick={() => handleCreatePatient(v)}>
              {v.name[0].text}
            </Button>
          ))}
        </Space>
      </Modal>
    </>
  );
};
