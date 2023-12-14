import { SelectionError } from "core/src/component/Error/SelectionError";
import { Page } from "core/src/component/Page";
import { Providers } from "core/src/component/Providers";
import { HeaderProps } from "core/src/component/header/Header";
import ReactDOM from "react-dom/client";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router";
import { RecoilRoot } from "recoil";
import { CaregiverSelect } from "./component/CaregiverSelect";
import { MedicationPlan } from "./component/page/MedicationPlan";
import { Order } from "./component/page/Order";
import { SearchPatients } from "./component/page/SearchPatients";
import { ViewPatient } from "./component/page/ViewPatient";
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

  return (
    <Page title={t("header.caregiverTitle")} rightMenu={<CaregiverSelect />} navElements={navElements}>
      {selectedCaregiver ? (
        <Routes>
          <Route path="/" element={<SearchPatients />} />
          <Route path="/patient/:patientId" element={<ViewPatient />} />
          <Route path="/plan/:patientId" element={<MedicationPlan />} />
          <Route path="/create/:patientId" element={<Order />} />
          <Route path="/order/:orderId" element={<Order />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <SelectionError extra={<CaregiverSelect />} />
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
