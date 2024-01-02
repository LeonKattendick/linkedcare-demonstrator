import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { ViewPatient } from "core/src/component/page/ViewPatient";
import { useGetAllRequestOrchestrationsByPatient } from "core/src/hook/filter/useGetAllRequestOrchestrationsByPatient";
import { useGetPatientById } from "core/src/hook/query/useGetPatientById";
import { caregiverIsFromOrganization } from "core/src/util/matchingUtil";
import { Navigate, useParams } from "react-router";
import { useSelectedCaregiverAtom } from "../../hook/useSelectedCaregiverAtom";

export const CaregiverViewPatient = () => {
  const { patientId } = useParams();

  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  const { orchestrations, isOrchestrationsLoading } = useGetAllRequestOrchestrationsByPatient(patient?.id);

  if (isPatientLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;
  if (!caregiverIsFromOrganization(selectedCaregiver, patient.managingOrganization)) return <Navigate to="/" />;

  return (
    <ViewPatient
      patient={patient}
      shownOrders={orchestrations}
      isShownOrdersLoading={isOrchestrationsLoading}
      showCreateButton
    />
  );
};
