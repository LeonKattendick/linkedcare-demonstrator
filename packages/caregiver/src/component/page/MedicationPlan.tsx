import { Card, Flex, Space } from "antd";
import { Error } from "core/src/component/Error";
import { Loading } from "core/src/component/Loading";
import { useGetPatientById } from "core/src/hook/useGetPatientById";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

export const MedicationPlan = () => {
  const { t } = useTranslation();
  const { patientId } = useParams();

  const { patient, isPatientLoading } = useGetPatientById(patientId);

  if (isPatientLoading) return <Loading />;
  if (!patient)
    return (
      <Error
        title={t("viewPatient.notFoundTitle")}
        subtitle={t("viewPatient.notFoundSubtitle", { id: patientId })}
        status="error"
      />
    );

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <Card>
        <Space size="large">
          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            {patient.name.find((v) => v.use === "official")?.text}
          </span>
        </Space>
      </Card>
      <Card style={{ height: "100%" }}>test</Card>
    </Flex>
  );
};
