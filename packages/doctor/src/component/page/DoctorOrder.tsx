import { OrderNotFoundError } from "core/src/component/Error/OrderNotFoundError";
import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { Order } from "core/src/component/page/Order";
import { useGetAllValidMedicationRequestsForOrchestration } from "core/src/hook/useGetAllValidMedicationRequestsForOrchestration";
import { useGetPatientById } from "core/src/hook/useGetPatientById";
import { useGetRequestOrchestrationById } from "core/src/hook/useGetRequestOrchestrationById";
import { identifierEqualsReference } from "core/src/util/matchingUtil";
import { Navigate, useParams } from "react-router";
import { useSelectedDoctorAtom } from "../../hook/useSelectedDoctorAtom";

export const DoctorOrder = () => {
  const { patientId, orderId } = useParams();

  const { selectedDoctor } = useSelectedDoctorAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  const { orchestration, isOrchestrationLoading } = useGetRequestOrchestrationById(orderId);
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequestsForOrchestration(orderId, patientId);

  if (isPatientLoading || isOrchestrationLoading || isRequestsLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;

  if (!orchestration) return <OrderNotFoundError orderId={orderId} />;
  if (!requests.find((v) => identifierEqualsReference(selectedDoctor?.identifier[0], v.performer[0]))) {
    return <Navigate to="/" />;
  }

  return <Order patient={patient} order={orchestration} doctor={selectedDoctor!} />;
};
