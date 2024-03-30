import { ConfigProvider } from "antd";
import { SelectionError } from "core/src/component/Error/SelectionError";
import { HeaderProps } from "core/src/component/Header";
import { Loading } from "core/src/component/Loading";
import { Page } from "core/src/component/Page";
import { UserType, useUserTypeAtom } from "core/src/hook/useUserTypeAtom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router";
import { DoctorSelect } from "./component/DoctorSelect";
import { DoctorMedicationPlan } from "./component/page/DoctorMedicationPlan";
import { DoctorOrder } from "./component/page/DoctorOrder";
import { DoctorOrders } from "./component/page/DoctorOrders";
import { DoctorSearchPatients } from "./component/page/DoctorSearchPatients";
import { DoctorViewPatient } from "./component/page/DoctorViewPatient";
import { useSelectedDoctorAtom } from "./hook/useSelectedDoctorAtom";

const navElements: HeaderProps["navElements"] = [
  { key: "", label: "header.searchPatients" },
  { key: "orders", label: "header.orderOverview" },
  { key: "patient", label: "header.viewPatient", showOnVisit: true },
  { key: "plan", label: "header.medicationPlan", showOnVisit: true },
  { key: "order", label: "header.viewOrder", showOnVisit: true },
];

export const App = () => {
  const { t } = useTranslation();
  const { userType, setUserType } = useUserTypeAtom();
  const { selectedDoctor } = useSelectedDoctorAtom();

  useEffect(() => {
    setUserType(UserType.DOCTOR);
  }, [setUserType]);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#27ae60" } }}>
      <Page title={t("translation:header.doctorTitle")} rightMenu={<DoctorSelect />} navElements={navElements}>
        {userType ? (
          selectedDoctor ? (
            <Routes>
              <Route path="/" element={<DoctorSearchPatients />} />
              <Route path="/orders" element={<DoctorOrders />} />
              <Route path="/patient/:patientId" element={<DoctorViewPatient />} />
              <Route path="/plan/:patientId" element={<DoctorMedicationPlan />} />
              <Route path="/order/:patientId/:orderId" element={<DoctorOrder />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <SelectionError extra={<DoctorSelect />} />
          )
        ) : (
          <Loading />
        )}
      </Page>
    </ConfigProvider>
  );
};
