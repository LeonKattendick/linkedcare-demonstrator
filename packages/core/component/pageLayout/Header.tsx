import { Button, Layout, Menu, Space } from "antd";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../Providers";

interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const { selectedTheme, setSelectedTheme } = useContext(ThemeContext);

  return (
    <Layout.Header style={{ display: "flex", alignItems: "center", color: "white" }}>
      <span style={{ fontWeight: "bold", fontSize: 20, marginRight: 50 }}>{props.title}</span>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={new Array(5).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`,
          };
        })}
      />
      <Space style={{ justifySelf: "flex-end", marginLeft: "auto" }}>
        <Button
          onClick={() => {
            i18n.changeLanguage(i18n.language == "de" ? "en" : "de");
          }}
        >
          {i18n.language == "de" ? t("german") : t("english")}
        </Button>
        <Button
          onClick={() => {
            i18n.changeLanguage("en");
            setSelectedTheme(selectedTheme == "light" ? "dark" : "light");
          }}
        >
          {selectedTheme == "light" ? "Light" : "Dark"}
        </Button>
      </Space>
    </Layout.Header>
  );
};
