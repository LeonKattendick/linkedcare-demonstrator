import { Layout, Space } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HeaderMenu } from "./HeaderMenu";
import { AdminButton } from "./button/AdminButton";
import { FhirStatusButton } from "./button/FhirStatusButton";
import { LanguageButton } from "./button/LanguageButton";
import { ThemeButton } from "./button/ThemeButton";

export interface HeaderProps {
  title: string;
  rightMenu: JSX.Element;
  navElements: {
    key: string;
    label: string;
    showOnVisit?: boolean; // navElement will only be visible when user is on that page
  }[];
}

export const Header = (props: HeaderProps) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t(props.title);
  }, [i18n.language]);

  return (
    <Layout.Header style={{ display: "flex", alignItems: "center", color: "white" }}>
      <span style={{ fontWeight: "bold", fontSize: 20, marginLeft: 26, marginRight: 50 }}>{props.title}</span>
      <HeaderMenu navElements={props.navElements} />
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
