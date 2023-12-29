import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { ViewPatient } from "core/src/component/page/ViewPatient";
import { useGetPatientById } from "core/src/hook/useGetPatientById";
import { useParams } from "react-router";
import { useGetRelevantRequestOrchestrationsByPatient } from "../../hook/useGetRelevantRequestOrchestrationsByPatient";

export const DoctorViewPatient = () => {
  const { patientId } = useParams();

  const { patient, isPatientLoading } = useGetPatientById(patientId);

  const { orchestrations, isOrchestrationsLoading } = useGetRelevantRequestOrchestrationsByPatient(patient?.id);

  if (isPatientLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;

  return <ViewPatient patient={patient} shownOrders={orchestrations} isShownOrdersLoading={isOrchestrationsLoading} />;
};
