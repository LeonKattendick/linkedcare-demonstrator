import { Layout, Menu, Space } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { AdminButton } from "./button/AdminButton";
import { FhirStatusButton } from "./button/FhirStatusButton";
import { LanguageButton } from "./button/LanguageButton";
import { ThemeButton } from "./button/ThemeButton";

interface HeaderProps {
  title: string;
  rightMenu: JSX.Element;
  navElements: {
    label: string;
    path: string;
  }[];
}

export const Header = (props: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t(props.title);
  }, [i18n.language]);

  return (
    <Layout.Header style={{ display: "flex", alignItems: "center", color: "white" }}>
      <span style={{ fontWeight: "bold", fontSize: 20, marginLeft: 26, marginRight: 50 }}>{props.title}</span>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ flexGrow: 1 }}
        selectedKeys={[location.pathname]}
        onSelect={(v) => navigate(v.key)}
        items={props.navElements.map((v) => ({
          key: v.path,
          label: t(v.label),
        }))}
      />
      <Space style={{ justifySelf: "flex-end", marginLeft: "auto" }}>
        {props.rightMenu}
        <FhirStatusButton />
        <LanguageButton />
        <ThemeButton />
        <AdminButton />
      </Space>
    </Layout.Header>
  );
};
