import { BgColorsOutlined, FireTwoTone } from "@ant-design/icons";
import { Button, Layout, Menu, Space, Tooltip, theme } from "antd";
import Flag from "react-flagkit";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { useGetMetadata } from "../../hook/useGetMetadata";
import { globalThemeAtom } from "../../util/recoilUtil";
import { AdminButton } from "../admin/AdminButton";

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
  const [globalTheme, setGlobalTheme] = useRecoilState(globalThemeAtom);
  const { metadata, isMetadataSuccess } = useGetMetadata();
  const { token } = theme.useToken();

  const isGerman = ["de", "de-DE", "de-AT"].includes(i18n.language);
  const isLightTheme = globalTheme === "light";

  return (
    <Layout.Header style={{ display: "flex", alignItems: "center", color: "white" }}>
      <span style={{ fontWeight: "bold", fontSize: 20, marginLeft: 26, marginRight: 50 }}>{props.title}</span>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ flexGrow: "1" }}
        selectedKeys={[location.pathname]}
        onSelect={(v) => navigate(v.key)}
        items={props.navElements.map((v) => ({
          key: v.path,
          label: t(v.label),
        }))}
      />
      <Space style={{ justifySelf: "flex-end", marginLeft: "auto" }}>
        {props.rightMenu}
        <Tooltip
          title={
            isMetadataSuccess ? (
              <>
                Status: {metadata?.status}
                <br />
                FHIR Version: {metadata?.fhirVersion}
              </>
            ) : (
              t("connectionFailed")
            )
          }
        >
          <Button
            type="primary"
            danger={!isMetadataSuccess}
            style={{
              backgroundColor: isMetadataSuccess ? token.colorBgContainer : "",
              borderColor: isMetadataSuccess ? token.colorBorder : "",
            }}
            icon={<FireTwoTone twoToneColor={"orange"} />}
          />
        </Tooltip>
        <Tooltip title={t("changeLanguage")}>
          <Button
            onClick={() => {
              i18n.changeLanguage(isGerman ? "en-US" : "de-DE");
            }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            icon={<Flag country={isGerman ? "AT" : "GB"} size={15} />}
          />
        </Tooltip>
        <Tooltip title={t("changeTheme")}>
          <Button
            onClick={() => {
              setGlobalTheme(isLightTheme ? "dark" : "light");
            }}
            icon={<BgColorsOutlined />}
          />
        </Tooltip>
        <AdminButton />
      </Space>
    </Layout.Header>
  );
};
