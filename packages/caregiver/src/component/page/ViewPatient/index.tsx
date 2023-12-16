import { Flex } from "antd";
import { PatientNotFoundError } from "core/src/component/Error/PatientNotFoundError";
import { Loading } from "core/src/component/Loading";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useGetPatientById } from "core/src/hook/useGetPatientById";
import { organizationEqualsReference } from "core/src/util/matchingUtil";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router";
import { useSelectedCaregiverAtom } from "../../../hook/useSelectedCaregiverAtom";
import { ActiveOrders } from "./ActiveOrders";
import { CompletedOrders } from "./CompletedOrders";
import { PatientInfo } from "./PatientInfo";

export const ViewPatient = () => {
  const { t } = useTranslation();
  const { patientId } = useParams();

  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { patient, isPatientLoading } = useGetPatientById(patientId);

  if (isPatientLoading) return <Loading />;
  if (!patient) return <PatientNotFoundError patientId={patientId} />;
  if (!organizationEqualsReference(selectedCaregiver, patient.managingOrganization)) return <Navigate to="/" />;

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <PatientTitle patient={patient} title={t("translation:viewPatient.title")} />
      <Flex gap={16} style={{ height: "100%" }}>
        <PatientInfo patient={patient} />
        <Flex gap={16} vertical style={{ width: "100%", height: "100%" }}>
          <ActiveOrders patient={patient} />
          <CompletedOrders patient={patient} />
        </Flex>
      </Flex>
    </Flex>
  );
};
