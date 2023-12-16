import { Card, Flex } from "antd";
import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useGetPatientById } from "core/src/hook/useGetPatientById";
import { organizationEqualsReference } from "core/src/util/matchingUtil";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router";
import { useSelectedCaregiverAtom } from "../../hook/useSelectedCaregiverAtom";

export const MedicationPlan = () => {
  const { t } = useTranslation();
  const { patientId } = useParams();

  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  if (isPatientLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;
  if (!organizationEqualsReference(selectedCaregiver, patient.managingOrganization)) return <Navigate to="/" />;

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle patient={patient} hideMedicationPlanButton title={t("translation:patient.medicationPlan")} />
      <Card style={{ height: "100%" }}>test</Card>
    </Flex>
  );
};
