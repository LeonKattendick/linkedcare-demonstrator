import { Providers } from "core/src/component/Providers";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <Providers>
      <App />
    </Providers>
  </RecoilRoot>
);
