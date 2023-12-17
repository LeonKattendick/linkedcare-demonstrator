import { App, ConfigProvider, theme } from "antd";
import deDE from "antd/locale/de_DE";
import enUS from "antd/locale/en_US";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HashRouter } from "react-router-dom";
import { useGlobalThemeAtom } from "../hook/useGlobalThemeAtom";
import "../util/i18n";
import { isGerman } from "../util/i18n";

export const CACHE_TIME = 1000 * 60 * 15;

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: CACHE_TIME } } });

export const Providers = (props: React.PropsWithChildren<{}>) => {
  const { globalTheme, setGlobalTheme, isLightTheme } = useGlobalThemeAtom();
  const { i18n } = useTranslation();

  useEffect(() => {
    const localTheme = localStorage.getItem("antdTheme");
    if (localTheme) setGlobalTheme(localTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("antdTheme", globalTheme);
  }, [globalTheme]);

  return (
    <HashRouter>
      <ConfigProvider
        locale={isGerman(i18n.language) ? deDE : enUS}
        theme={{
          algorithm: isLightTheme ? theme.defaultAlgorithm : theme.darkAlgorithm,
          components: { Layout: { headerPadding: 24, footerPadding: "18px 24px 18px 18px" } },
        }}
      >
        <App>
          <QueryClientProvider client={queryClient}>
            {props.children}
            {process.env.NODE_ENV !== "production" && <ReactQueryDevtools initialIsOpen={false} />}
          </QueryClientProvider>
        </App>
      </ConfigProvider>
    </HashRouter>
  );
};
