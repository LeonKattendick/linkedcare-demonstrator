import { Card, Col, Input, Row, Table } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { ContactPoint } from "core/src/interface/linca/fhir/ContactPoint";
import { renderBirthDate } from "core/src/util/renderUtil";
import { useTranslation } from "react-i18next";

interface PatientInfoProps {
  patient: Patient;
}

export const PatientInfo = ({ patient }: PatientInfoProps) => {
  const { t } = useTranslation();

  const address = patient.address[0];

  return (
    <Card style={{ width: "70%", height: "100%" }}>
      <Row gutter={[0, 16]}>
        <Col span={8}>{t("translation:viewPatient.patientInfo.socialSecurityNumber")}</Col>
        <Col span={16}>
          <Input value={patient.identifier[0].value} readOnly />
        </Col>
        <Col span={8}>{t("translation:viewPatient.patientInfo.name")}</Col>
        <Col span={16}>
          <Input value={patient.name[0].text} readOnly />
        </Col>
        <Col span={8}>{t("translation:viewPatient.patientInfo.gender")}</Col>
        <Col span={16}>
          <Input value={t(`general.gender.${patient.gender}`)} readOnly />
        </Col>
        <Col span={8}>{t("translation:viewPatient.patientInfo.birthDate")}</Col>
        <Col span={16}>
          <Input value={renderBirthDate(patient.birthDate)} readOnly />
        </Col>
        <Col span={8}>{t("translation:viewPatient.patientInfo.contacts")}</Col>
        <Col span={16}>
          <Table
            dataSource={patient.telecom.map((v, i) => ({ key: i, ...v }))}
            size="small"
            bordered
            pagination={false}
          >
            <Table.Column
              title={t("translation:viewPatient.patientInfo.contactSystem")}
              render={(_, record: ContactPoint) => (
                <>
                  {t(`viewPatient.patientInfo.contactSystems.${record.system}`)} (
                  {t(`viewPatient.patientInfo.contactUses.${record.use}`)})
                </>
              )}
            />
            <Table.Column title={t("translation:viewPatient.patientInfo.contactValue")} dataIndex="value" />
          </Table>
        </Col>
        <Col span={8}>{t("translation:viewPatient.patientInfo.address")}</Col>
        <Col span={16}>
          <Input.TextArea
            value={`${address.line.join("\n")}\n${address.postalCode} ${address.city} (${address.country})`}
            autoSize
            readOnly
          />
        </Col>
      </Row>
    </Card>
  );
};
