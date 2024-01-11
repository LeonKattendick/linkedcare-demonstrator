import { App, Button, Divider, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ModalProps } from "../../../interface/ModalProps";
import { Patient } from "../../../interface/linca/Patient";
import { Organization } from "../../../interface/linca/fhir/Organization";
import { Practitioner } from "../../../interface/linca/fhir/Practitioner";
import { caregiverModels } from "../../../model/caregiverModels";
import { doctorModels } from "../../../model/doctorModels";
import { patientModels } from "../../../model/patientModels";
import { pharmacyModels } from "../../../model/pharmacyModels";
import { createOrganization } from "../../../service/organizationService";
import { createPatient } from "../../../service/patientService";
import { createPractitioner } from "../../../service/practitionerService";

export const AdminModal = (props: ModalProps) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleCreatePatient = (patient: Patient) => {
    createPatient(patient)
      .then((patient) => {
        message.success(t("translation:admin.createPatientSuccess", { name: patient.name[0].text, id: patient.id }));
      })
      .catch(() => message.error(t("translation:admin.createPatientError", { name: patient.name[0].text })));
  };

  const handleCreateCaregiver = (caregiver: Organization) => {
    createOrganization(caregiver)
      .then((organization) => {
        message.success(
          t("translation:admin.createCaregiverSuccess", { name: organization.name, id: organization.id })
        );
      })
      .catch(() => message.error(t("translation:admin.createCaregiverError", { name: caregiver.name })));
  };

  const handleCreateDoctor = (practitioner: Practitioner) => {
    createPractitioner(practitioner)
      .then((practitioner) => {
        message.success(
          t("translation:admin.createDoctorSuccess", { name: practitioner.name[0].text, id: practitioner.id })
        );
      })
      .catch(() => message.error(t("translation:admin.createDoctorError", { name: practitioner.name })));
  };

  const handleCreatePharmacy = (pharmacy: Organization) => {
    createOrganization(pharmacy)
      .then((organization) => {
        message.success(t("translation:admin.createPharmacySuccess", { name: organization.name, id: organization.id }));
      })
      .catch(() => message.error(t("translation:admin.createPharmacyError", { name: pharmacy.name })));
  };

  return (
    <>
      <Modal
        open={props.open}
        onCancel={() => props.setOpen(false)}
        title={t("translation:admin.title")}
        footer={null}
        width="40%"
      >
        <Divider orientation="left">{t("translation:admin.createPatients")}</Divider>
        <Space>
          {patientModels.map((v, i) => (
            <Button type="primary" key={i} onClick={() => handleCreatePatient(v)}>
              {v.name[0].text}
            </Button>
          ))}
        </Space>
        <Divider orientation="left">{t("translation:admin.createCaregivers")}</Divider>
        <Space>
          {caregiverModels.map((v, i) => (
            <Button type="primary" key={i} onClick={() => handleCreateCaregiver(v)}>
              {v.name}
            </Button>
          ))}
        </Space>
        <Divider orientation="left">{t("translation:admin.createDoctors")}</Divider>
        <Space>
          {doctorModels.map((v, i) => (
            <Button type="primary" key={i} onClick={() => handleCreateDoctor(v)}>
              {v.name[0].text}
            </Button>
          ))}
        </Space>
        <Divider orientation="left">{t("translation:admin.createPharmacies")}</Divider>
        <Space>
          {pharmacyModels.map((v, i) => (
            <Button type="primary" key={i} onClick={() => handleCreatePharmacy(v)}>
              {v.name}
            </Button>
          ))}
        </Space>
      </Modal>
    </>
  );
};
