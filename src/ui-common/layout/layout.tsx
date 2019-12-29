import Head from "next/head";
import { Header } from "./header";
import { MapNavigation } from "./navigation";
import { Notifications } from "./Notifications";
import { useEffect } from "react";
import ReactGA from "react-ga";
import { useUpdateLayout } from "../../utils/CommonHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

interface Props {
  title?: string;
}

export const Layout: React.FC<Props> = ({ title = "CSGONades", children }) => {
  useUpdateLayout();
  const { isMobile, uiDimensions, sideBarOpen } = useTheme();

  useEffect(() => {
    const IS_BROWSER = typeof window !== "undefined";
    const IS_PROD = process.env.NODE_ENV === "production";

    if (IS_BROWSER && !window.GA_INITIALIZED) {
      ReactGA.initialize("UA-71896446-6", {
        testMode: IS_PROD ? false : true,
        debug: IS_PROD ? false : true
      });
      window.GA_INITIALIZED = true;

      if (IS_PROD) {
        // @ts-ignore
        ReactGA.ga(function(tracker) {
          var clientId = tracker.get("clientId");
          console.log("#GA Clientid", clientId);
          // TODO: Might use this instead of setting custom session token
        });
      }
    }

    const location = window.location.pathname + window.location.search;

    ReactGA.pageview(location);
  }, []);

  return (
    <div id="page">
      <Head>
        <title>{title}</title>
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
