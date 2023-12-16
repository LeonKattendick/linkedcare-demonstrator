import { Flex } from "antd";
import { PatientTitle } from "core/src/component/PatientTitle";
import { useTranslation } from "react-i18next";
import { Patient } from "../../../interface/linca/Patient";
import { ActiveOrders } from "./ActiveOrders";
import { CompletedOrders } from "./CompletedOrders";
import { PatientInfo } from "./PatientInfo";

interface ViewPatientProps {
  patient: Patient;
}

export const ViewPatient = ({ patient }: ViewPatientProps) => {
  const { t } = useTranslation();

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
