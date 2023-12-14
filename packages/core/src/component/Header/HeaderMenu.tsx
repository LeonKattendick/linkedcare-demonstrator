import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { HeaderProps } from ".";

type HeaderMenuProps = { navElements: HeaderProps["navElements"] };

export const HeaderMenu = (props: HeaderMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKeys = props.navElements.filter((v) => v.key === location.pathname.split("/")[1]).map((v) => v.key);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ flexGrow: 1 }}
      selectedKeys={selectedKeys}
      onSelect={(v) => navigate(v.key)}
      items={props.navElements
        .filter((v) => !v.showOnVisit || selectedKeys.includes(v.key))
        .map((v) => ({
          key: v.key,
          label: t(v.label),
        }))}
    />
  );
};
