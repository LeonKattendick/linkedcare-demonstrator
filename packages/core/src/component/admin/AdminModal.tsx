import { Button, Divider, Modal, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { ModalProps } from "../../interface/ModalProps";
import { Patient } from "../../interface/linca/Patient";
import { Organization } from "../../interface/linca/fhir/Organization";
import { organizationModels } from "../../model/organizationModels";
import { patientModels } from "../../model/patientModels";
import { createOrganization } from "../../service/organizationService";
import { createPatient } from "../../service/patientService";

export const AdminModal = (props: ModalProps) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreateOrganization = (organization: Organization) => {
    createOrganization(organization)
      .then((res) => {
        const organization = res.data as Organization;
        messageApi.success(t("admin.createOrganizationSuccess", { name: organization.name, id: organization.id }));
      })
      .catch(() => messageApi.error(t("admin.createOrganizationError", { name: organization.name })));
  };

  const handleCreatePatient = (patient: Patient) => {
    createPatient(patient)
      .then((res) => {
        const patient = res.data as Patient;
        messageApi.success(t("admin.createPatientSuccess", { name: patient.name[0].text, id: patient.id }));
      })
      .catch(() => messageApi.error(t("admin.createPatientError", { name: patient.name[0].text })));
  };

  return (
    <>
      {contextHolder}
      <Modal open={props.open} onCancel={() => props.setOpen(false)} title={t("admin.title")} footer={null} width="40%">
        <Divider orientation="left">{t("admin.createOrganizations")}</Divider>
        <Space>
          {organizationModels.map((v, i) => (
            <Button type="primary" key={i} onClick={() => handleCreateOrganization(v)}>
              {v.name}
            </Button>
          ))}
        </Space>
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