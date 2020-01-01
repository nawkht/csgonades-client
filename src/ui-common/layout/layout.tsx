import Head from "next/head";
import { Header } from "./header";
import { MapNavigation } from "./navigation";
import { Notifications } from "./Notifications";
import { useEffect } from "react";
import { useUpdateLayout } from "../../utils/CommonHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";

interface Props {
  title?: string;
}

export const Layout: React.FC<Props> = ({ title, children }) => {
  useUpdateLayout();
  const { isMobile, uiDimensions, sideBarOpen } = useTheme();

  useEffect(() => {
    const location = window.location.pathname + window.location.search;
    GoogleAnalytics.pageView(location);
  }, []);

  const pageTitle = title ? `CSGO Nades | ${title}` : `CSGO Nades`;

  return (
    <div id="page">
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Header />

      <Notifications />

      {sideBarOpen && <MapNavigation />}

      <div id="content">
        <main>{children}</main>
      </div>

      <style jsx>{`
        #content {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        main {
          margin-left: ${isMobile ? 0 : uiDimensions.SIDEBAR_WIDTH}px;
          margin-top: ${uiDimensions.HEADER_HEIGHT}px;
          background-color: #f2f2f2;
          flex: 1;
        }
      `}</style>
    </div>
  );
};
