import { Card, Flex } from "antd";
import { Page } from "core/src/component/Page";
import { Providers } from "core/src/component/Providers";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { CaregiverSelect } from "./component/CaregiverSelect";

const App = () => {
  return (
    <Page title="Caregiver LINCA Demo" rightMenu={<CaregiverSelect />}>
      <Flex gap={16} vertical style={{ height: "100%" }}>
        <Card>test</Card>
        <Flex gap={16} style={{ height: "100%" }}>
          <Card style={{ width: "100%", height: "100%" }}>test</Card>
          <Flex gap={16} vertical style={{ width: "100%", height: "100%" }}>
            <Card style={{ height: "100%" }}>test</Card>
            <Card style={{ height: "100%" }}>test</Card>
          </Flex>
        </Flex>
      </Flex>
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
