import { Card, Flex } from "antd";
import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useGetPatientById } from "core/src/hook/useGetPatientById";
import { organizationEqualsReference } from "core/src/util/matchingUtil";
import { t } from "i18next";
import { Navigate, useParams } from "react-router";
import { useSelectedCaregiverAtom } from "../../hook/useSelectedCaregiverAtom";

export const Order = () => {
  const { patientId, orderId } = useParams();
  const isNew = !orderId && !!patientId;

  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  if (isPatientLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;
  if (!organizationEqualsReference(selectedCaregiver, patient.managingOrganization)) return <Navigate to="/" />;

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle patient={patient!} hideMedicationPlanButton title={t("translation:createOrder.title")} />
      <Card style={{ height: "100%" }}>
        Order: {orderId}, Patient: {patientId}, Neu: {isNew ? "Ja" : "Nein"}
      </Card>
    </Flex>
  );
};
