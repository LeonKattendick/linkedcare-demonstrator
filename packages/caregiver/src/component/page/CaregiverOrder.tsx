import { OrderNotFoundError } from "core/src/component/Error/OrderNotFoundError";
import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { Order } from "core/src/component/page/Order";
import { useGetAllValidMedicationRequestsForOrchestration } from "core/src/hook/filter/useGetAllValidMedicationRequestsForOrchestration";
import { useGetPatientById } from "core/src/hook/query/useGetPatientById";
import { useGetRequestOrchestrationById } from "core/src/hook/query/useGetRequestOrchestrationById";
import { caregiverIsFromOrganization, identifierEqualsReference } from "core/src/util/matchingUtil";
import { Navigate, useParams } from "react-router";
import { useSelectedCaregiverAtom } from "../../hook/useSelectedCaregiverAtom";

const CaregiverOrder = () => {
  const { patientId, orderId } = useParams();

  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  const { orchestration, isOrchestrationLoading } = useGetRequestOrchestrationById(orderId);
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequestsForOrchestration(orderId, patientId);

  if (isPatientLoading || isOrchestrationLoading || isRequestsLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;
  if (!caregiverIsFromOrganization(selectedCaregiver, patient.managingOrganization)) return <Navigate to="/" />;

  if (!!orderId) {
    if (!orchestration) return <OrderNotFoundError orderId={orderId} />;
    if (!identifierEqualsReference(selectedCaregiver!.identifier[0], orchestration.subject)) return <Navigate to="/" />;
  }

  return <Order patient={patient} order={orchestration} requests={requests} caregiver={selectedCaregiver!} />;
};

export default CaregiverOrder;
