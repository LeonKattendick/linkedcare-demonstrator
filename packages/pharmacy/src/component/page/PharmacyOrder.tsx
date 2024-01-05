import { OrderNotFoundError } from "core/src/component/Error/OrderNotFoundError";
import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { Order } from "core/src/component/page/Order";
import { useGetAllValidMedicationRequestsForOrchestration } from "core/src/hook/filter/useGetAllValidMedicationRequestsForOrchestration";
import { useGetPatientById } from "core/src/hook/query/useGetPatientById";
import { useGetRequestOrchestrationById } from "core/src/hook/query/useGetRequestOrchestrationById";
import { usePermissions } from "core/src/hook/usePermissions";
import { useMemo } from "react";
import { Navigate, useParams } from "react-router";
import { useSelectedPharmacyAtom } from "../../hook/useSelectedPharmacyAtom";

export const PharmacyOrder = () => {
  const { patientId, orderId } = useParams();
  const perms = usePermissions();

  const { selectedPharmacy } = useSelectedPharmacyAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  const { orchestration, isOrchestrationLoading } = useGetRequestOrchestrationById(orderId);
  const { requests, isRequestsLoading } = useGetAllValidMedicationRequestsForOrchestration(orderId, patientId);

  const pharmacyRequests = useMemo(
    () => requests.filter((v) => perms.canPharmacySeeRequest(v, selectedPharmacy)),
    [requests, selectedPharmacy]
  );

  if (isPatientLoading || isOrchestrationLoading || isRequestsLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;

  if (!orchestration) return <OrderNotFoundError orderId={orderId} />;
  if (pharmacyRequests.length === 0) return <Navigate to="/" />;

  return <Order patient={patient} order={orchestration} requests={pharmacyRequests} pharmacy={selectedPharmacy!} />;
};
