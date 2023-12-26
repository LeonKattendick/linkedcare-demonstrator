import { SelectionError } from "core/src/component/Error/SelectionError";
import { HeaderProps } from "core/src/component/Header";
import { Loading } from "core/src/component/Loading";
import { Page } from "core/src/component/Page";
import { Providers } from "core/src/component/Providers";
import { UserType, useUserTypeAtom } from "core/src/hook/useUserTypeAtom";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router";
import { RecoilRoot } from "recoil";
import { CaregiverSelect } from "./component/CaregiverSelect";
import { CaregiverMedicationPlan } from "./component/page/CaregiverMedicationPlan";
import { CaregiverOrder } from "./component/page/CaregiverOrder";
import { CaregiverSearchPatients } from "./component/page/CaregiverSearchPatients";
import { CaregiverViewPatient } from "./component/page/CaregiverViewPatient";
import { useSelectedCaregiverAtom } from "./hook/useSelectedCaregiverAtom";

const navElements: HeaderProps["navElements"] = [
  { key: "", label: "header.searchPatients" },
  { key: "patient", label: "header.viewPatient", showOnVisit: true },
  { key: "plan", label: "header.medicationPlan", showOnVisit: true },
  { key: "create", label: "header.newOrder", showOnVisit: true },
  { key: "order", label: "header.viewOrder", showOnVisit: true },
];

const App = () => {
  const { t } = useTranslation();
  const { selectedCaregiver } = useSelectedCaregiverAtom();
  const { userType, setUserType } = useUserTypeAtom();

  useEffect(() => {
    setUserType(UserType.CAREGIVER);
  }, []);

  return (
    <Page title={t("translation:header.caregiverTitle")} rightMenu={<CaregiverSelect />} navElements={navElements}>
      {userType ? (
        selectedCaregiver ? (
          <Routes>
            <Route path="/" element={<CaregiverSearchPatients />} />
            <Route path="/patient/:patientId" element={<CaregiverViewPatient />} />
            <Route path="/plan/:patientId" element={<CaregiverMedicationPlan />} />
            <Route path="/create/:patientId" element={<CaregiverOrder />} />
            <Route path="/order/:patientId/:orderId" element={<CaregiverOrder />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <SelectionError extra={<CaregiverSelect />} />
        )
      ) : (
        <Loading />
      )}
    </Page>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <Providers>
      <App />
    </Providers>
  </RecoilRoot>
);
