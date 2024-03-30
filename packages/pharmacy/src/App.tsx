import { ConfigProvider } from "antd";
import { SelectionError } from "core/src/component/Error/SelectionError";
import { HeaderProps } from "core/src/component/Header";
import { Loading } from "core/src/component/Loading";
import { Page } from "core/src/component/Page";
import { UserType, useUserTypeAtom } from "core/src/hook/useUserTypeAtom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router";
import { PharmacySelect } from "./component/PharmacySelect";
import { PharmacyOrder } from "./component/page/PharmacyOrder";
import { PharmacyOrders } from "./component/page/PharmacyOrders";
import { useSelectedPharmacyAtom } from "./hook/useSelectedPharmacyAtom";

const navElements: HeaderProps["navElements"] = [
  { key: "", label: "header.orderOverview" },
  { key: "order", label: "header.viewOrder", showOnVisit: true },
];

export const App = () => {
  const { t } = useTranslation();
  const { userType, setUserType } = useUserTypeAtom();
  const { selectedPharmacy } = useSelectedPharmacyAtom();

  useEffect(() => {
    setUserType(UserType.PHARMACY);
  }, [setUserType]);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#d48806" } }}>
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
    </ConfigProvider>
  );
};
