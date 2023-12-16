import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { ViewPatient } from "core/src/component/page/ViewPatient";
import { useGetPatientById } from "core/src/hook/useGetPatientById";
import { organizationEqualsReference } from "core/src/util/matchingUtil";
import { Navigate, useParams } from "react-router";
import { useSelectedCaregiverAtom } from "../../hook/useSelectedCaregiverAtom";

export const CaregiverViewPatient = () => {
  const { patientId } = useParams();

  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  if (isPatientLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;
  if (!organizationEqualsReference(selectedCaregiver, patient.managingOrganization)) return <Navigate to="/" />;

  return <ViewPatient patient={patient} />;
};
