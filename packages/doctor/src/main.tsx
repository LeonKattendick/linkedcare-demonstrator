import { Page } from "core/src/component/Page";
import { Providers } from "core/src/component/Providers";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

const navElements = [
  { label: "header.searchPatients", path: "/" },
  { label: "header.orderOverview", path: "/orders" },
];

const App = () => {
  return (
    <Page title="Doctor LINCA Demo" rightMenu={<></>} navElements={navElements}>
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
