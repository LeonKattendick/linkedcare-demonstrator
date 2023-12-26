import { HeaderProps } from "core/src/component/Header";
import { Loading } from "core/src/component/Loading";
import { Page } from "core/src/component/Page";
import { Providers } from "core/src/component/Providers";
import { UserType, useUserTypeAtom } from "core/src/hook/useUserTypeAtom";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useTranslation } from "react-i18next";
import { RecoilRoot } from "recoil";

const navElements: HeaderProps["navElements"] = [{ key: "", label: "header.orderOverview" }];

const App = () => {
  const { t } = useTranslation();
  const { userType, setUserType } = useUserTypeAtom();

  useEffect(() => {
    setUserType(UserType.PHARMACY);
  }, []);

  return (
    <Page title={t("translation:header.pharmacyTitle")} rightMenu={<></>} navElements={navElements}>
      {userType ? <>test</> : <Loading />}
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
