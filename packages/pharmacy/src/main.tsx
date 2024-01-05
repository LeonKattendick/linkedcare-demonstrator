import { SelectionError } from "core/src/component/Error/SelectionError";
import { HeaderProps } from "core/src/component/Header";
import { Loading } from "core/src/component/Loading";
import { Page } from "core/src/component/Page";
import { Providers } from "core/src/component/Providers";
import { UserType, useUserTypeAtom } from "core/src/hook/useUserTypeAtom";
import { lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router";
import { RecoilRoot } from "recoil";
import { PharmacySelect } from "./component/PharmacySelect";
import { useSelectedPharmacyAtom } from "./hook/useSelectedPharmacyAtom";

const navElements: HeaderProps["navElements"] = [
  { key: "", label: "header.orderOverview" },
  { key: "order", label: "header.viewOrder", showOnVisit: true },
];

const PharmacyOrders = lazy(() => import("./component/page/PharmacyOrders"));
const PharmacyOrder = lazy(() => import("./component/page/PharmacyOrder"));

const App = () => {
  const { t } = useTranslation();
  const { userType, setUserType } = useUserTypeAtom();
  const { selectedPharmacy } = useSelectedPharmacyAtom();

  useEffect(() => {
    setUserType(UserType.PHARMACY);
  }, []);

  return (
    <Page title={t("translation:header.pharmacyTitle")} rightMenu={<PharmacySelect />} navElements={navElements}>
      {userType ? (
        selectedPharmacy ? (
          <Routes>
            <Route path="/" element={<PharmacyOrders />} />
            <Route path="/order/:patientId/:orderId" element={<PharmacyOrder />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <SelectionError extra={<PharmacySelect />} />
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
