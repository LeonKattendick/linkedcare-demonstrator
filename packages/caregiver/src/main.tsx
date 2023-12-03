import { Page } from "core/component/Page";
import { Providers } from "core/component/Providers";
import ReactDOM from "react-dom/client";

const App = () => {
  return <Page title="Caregiver LINCA Demo">test</Page>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
