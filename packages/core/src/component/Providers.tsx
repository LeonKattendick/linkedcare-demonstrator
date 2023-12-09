import { App, ConfigProvider, theme } from "antd";
import deDE from "antd/locale/de_DE";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { useGlobalThemeAtom } from "../hook/useGlobalThemeAtom";
import "../util/i18n";

export const CACHE_TIME = 1000 * 60 * 15;

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: CACHE_TIME } } });

export const Providers = (props: React.PropsWithChildren<{}>) => {
  const { globalTheme, setGlobalTheme, isLightTheme } = useGlobalThemeAtom();

  useEffect(() => {
    const localTheme = localStorage.getItem("antdTheme");
    if (localTheme) setGlobalTheme(localTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("antdTheme", globalTheme);
  }, [globalTheme]);

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={deDE}
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
    </BrowserRouter>
  );
};
