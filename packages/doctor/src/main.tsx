import { HeaderProps } from "core/src/component/Header";
import { Page } from "core/src/component/Page";
import { Providers } from "core/src/component/Providers";
import ReactDOM from "react-dom/client";
import { useTranslation } from "react-i18next";
import { RecoilRoot } from "recoil";

const navElements: HeaderProps["navElements"] = [
  { key: "", label: "header.searchPatients" },
  { key: "orders", label: "header.orderOverview" },
];

const App = () => {
  const { t } = useTranslation();

  return (
    <Page title={t("header.doctorTitle")} rightMenu={<></>} navElements={navElements}>
      test
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
