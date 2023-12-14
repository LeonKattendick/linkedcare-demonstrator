import { Button, Card, Flex, Space, Table } from "antd";
import { Error } from "core/src/component/Error";
import { Loading } from "core/src/component/Loading";
import { useGetPatientById } from "core/src/hook/useGetPatientById";
import { organizationEqualsReference } from "core/src/util/matchingUtil";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useParams } from "react-router";
import { useSelectedCaregiverAtom } from "../../hook/useSelectedCaregiverAtom";

export const ViewPatient = () => {
  const { t } = useTranslation();
  const { patientId } = useParams();
  const navigate = useNavigate();

  const { selectedCaregiver } = useSelectedCaregiverAtom();
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
  if (!organizationEqualsReference(selectedCaregiver, patient.managingOrganization)) return <Navigate to="/" />;

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <Card>
        <Space size="large">
          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            {patient.name.find((v) => v.use === "official")?.text}
          </span>
          <Button size="small" type="primary" onClick={() => navigate(`/plan/${patientId}`)}>
            {t("viewPatient.medicationPlan")}
          </Button>
        </Space>
      </Card>
      <Flex gap={16} style={{ height: "100%" }}>
        <Card style={{ width: "70%", height: "100%" }}>test</Card>
        <Flex gap={16} vertical style={{ width: "100%", height: "100%" }}>
          <Card style={{ height: "100%" }}>
            <Table />
          </Card>
          <Card style={{ height: "100%" }}>
            <Table />
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};
