import Head from "next/head";
import { Header } from "./header";
import { MapNavigation } from "./navigation";
import { Notifications } from "./Notifications";
import { useEffect } from "react";
import { useUpdateLayout } from "../../utils/CommonHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
// @ts-ignore
import removeMd from "remove-markdown";

interface Props {
  title?: string;
  description?: string;
}

export const Layout: React.FC<Props> = ({ title, description, children }) => {
  useUpdateLayout();
  const { isMobile, uiDimensions, sideBarOpen } = useTheme();

  useEffect(() => {
    let delayedAnalytics = setTimeout(() => {
      const location = window.location.pathname + window.location.search;
      GoogleAnalytics.pageView(location);
    }, 500);
    return () => {
      if (delayedAnalytics) {
        clearTimeout(delayedAnalytics);
      }
    };
  }, []);

  const pageTitle = title ? `${title} - CSGO Nades` : `CSGO Nades`;
  const pageDescription = description
    ? removeMd(description)
    : "CSGO Nades is a website that collects nades for Counter-Strike Global Offensive. You can browse smokes, flashbangs, molotovs or he-grenades for the most popular maps in CS:GO.";

  return (
    <div id="page">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:description" content={pageDescription} />
        <meta name="og:title" content={pageTitle} />
        <meta name="og:site_name" content="CSGONades" />
        <meta name="og:type" content="website" />
        <meta name="og:locale" content="en_EN" />
        <meta name="og:url" content="https://www.csgonades.com/" />
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
