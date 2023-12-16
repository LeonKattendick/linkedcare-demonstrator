import { useTranslation } from "react-i18next";
import { Error } from "./";

interface PatientNotFoundErrorProps {
  patientId: string | undefined;
}

export const PatientNotFoundError = ({ patientId }: PatientNotFoundErrorProps) => {
  const { t } = useTranslation();

  return (
    <Error
      title={t("translation:patient.notFoundTitle")}
      subtitle={t("translation:patient.notFoundSubtitle", { id: patientId })}
      status="error"
    />
  );
};
