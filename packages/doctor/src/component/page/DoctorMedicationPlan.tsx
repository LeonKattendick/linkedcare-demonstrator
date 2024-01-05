import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { MedicationPlan } from "core/src/component/page/MedicationPlan";
import { useGetPatientById } from "core/src/hook/query/useGetPatientById";
import { useParams } from "react-router";

const DoctorMedicationPlan = () => {
  const { patientId } = useParams();

  const { patient, isPatientLoading } = useGetPatientById(patientId);

  if (isPatientLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;

  return <MedicationPlan patient={patient} />;
};

export default DoctorMedicationPlan;
