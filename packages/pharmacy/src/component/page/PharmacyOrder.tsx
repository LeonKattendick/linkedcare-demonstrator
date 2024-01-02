import { OrderNotFoundError } from "core/src/component/Error/OrderNotFoundError";
import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { Order } from "core/src/component/page/Order";
import { useGetAllValidMedicationRequestsForOrchestration } from "core/src/hook/filter/useGetAllValidMedicationRequestsForOrchestration";
import { useGetPatientById } from "core/src/hook/query/useGetPatientById";
import { useGetRequestOrchestrationById } from "core/src/hook/query/useGetRequestOrchestrationById";
import { isPharmacyAbleToDispense } from "core/src/util/matchingUtil";
import { Navigate, useParams } from "react-router";
import { useSelectedPharmacyAtom } from "../../hook/useSelectedPharmacyAtom";

export const PharmacyOrder = () => {
  const { patientId, orderId } = useParams();

  const { selectedPharmacy } = useSelectedPharmacyAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  const { orchestration, isOrchestrationLoading } = useGetRequestOrchestrationById(orderId);
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequestsForOrchestration(orderId, patientId);

  if (isPatientLoading || isOrchestrationLoading || isRequestsLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;

  if (!orchestration) return <OrderNotFoundError orderId={orderId} />;
  if (!isPharmacyAbleToDispense(requests, selectedPharmacy)) return <Navigate to="/" />;

  return <Order patient={patient} order={orchestration} requests={requests} pharmacy={selectedPharmacy!} />;
};
