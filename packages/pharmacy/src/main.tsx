import { Page } from "core/src/component/Page";
import { Providers } from "core/src/component/Providers";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

const navElements = [{ label: "header.orderOverview", path: "/" }];

const App = () => {
  return (
    <Page title="Pharmacy LINCA Demo" rightMenu={<></>} navElements={navElements}>
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
