import { OrderNotFoundError } from "core/src/component/Error/OrderNotFoundError";
import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { Order } from "core/src/component/page/Order";
import { useGetPatientById } from "core/src/hook/useGetPatientById";
import { useGetRequestOrchestrationById } from "core/src/hook/useGetRequestOrchestrationById";
import { caregiverIsFromOrganization, identifierEqualsReference } from "core/src/util/matchingUtil";
import { Navigate, useParams } from "react-router";
import { useSelectedCaregiverAtom } from "../../hook/useSelectedCaregiverAtom";

export const CaregiverOrder = () => {
  const { patientId, orderId } = useParams();

  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  const { orchestration, isOrchestrationLoading } = useGetRequestOrchestrationById(orderId);

  if (isPatientLoading || isOrchestrationLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;
  if (!caregiverIsFromOrganization(selectedCaregiver, patient.managingOrganization)) return <Navigate to="/" />;

  if (!!orderId) {
    if (!orchestration) return <OrderNotFoundError orderId={orderId} />;
    if (!identifierEqualsReference(selectedCaregiver!.identifier[0], orchestration.subject)) return <Navigate to="/" />;
  }

  return <Order patient={patient} order={orchestration} caregiver={selectedCaregiver!} />;
};
