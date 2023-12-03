import { ConfigProvider, theme } from "antd";
import deDE from "antd/locale/de_DE";
import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HashRouter } from "react-router-dom";

export const ThemeContext = createContext({
  selectedTheme: "light",
  setSelectedTheme: (_t: string) => {},
});

export const CACHE_TIME = 1000 * 60 * 15;

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: CACHE_TIME } } });

export const Providers = (props: React.PropsWithChildren<{}>) => {
  const [selectedTheme, setSelectedTheme] = useState("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("antdTheme");
    if (localTheme) setSelectedTheme(localTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("antdTheme", selectedTheme);
  }, [selectedTheme]);

  return (
    <HashRouter>
      <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
        <ConfigProvider
          locale={deDE}
          theme={{
            algorithm: selectedTheme == "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
            components: { Layout: { headerPadding: 24 } },
          }}
        >
          <QueryClientProvider client={queryClient}>
            {props.children}
            {process.env.NODE_ENV !== "production" && (
              <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            )}
          </QueryClientProvider>
        </ConfigProvider>
      </ThemeContext.Provider>
    </HashRouter>
  );
};
