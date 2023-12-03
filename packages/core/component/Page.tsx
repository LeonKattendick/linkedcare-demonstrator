import { Layout, theme } from "antd";
import "antd/dist/reset.css";
import { Breadcrumbs } from "./pageLayout/Breadcrumbs";
import { Header } from "./pageLayout/Header";

interface PageProps {
  title: string;
}

export const Page = (props: React.PropsWithChildren<PageProps>) => {
  const { token } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header title={props.title} />
      <Layout.Content style={{ margin: "0 24px", height: "100%" }}>
        <Layout style={{ height: "100%" }}>
          <Breadcrumbs />
          <div style={{ height: "100%", backgroundColor: token.colorBgContainer, borderRadius: 4, padding: 12 }}>
            {props.children}
          </div>
        </Layout>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Demonstrator for{" "}
        <a href="https://www.linkedcare.at/de/" target="_blank">
          Linked Care
        </a>{" "}
        ©2023 Created by Leon Kattendick
      </Layout.Footer>
    </Layout>
  );
};
