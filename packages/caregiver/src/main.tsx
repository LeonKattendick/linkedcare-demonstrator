import { Page } from "core/src/component/Page";
import { Providers } from "core/src/component/Providers";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <Page title="Caregiver LINCA Demo" rightMenu={<>test</>}>
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
