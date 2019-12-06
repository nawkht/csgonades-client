import Head from "next/head";
import { Header } from "./header";
import { MapNavigation } from "./navigation";
import { UiConstants } from "../../../constants/ui";
import { Notifications } from "./Notifications";
import { useEffect } from "react";
import ReactGA from "react-ga";

interface Props {
  title?: string;
}

export const Layout: React.FC<Props> = ({ title = "CSGONades", children }) => {
  useEffect(() => {
    const IS_BROWSER = typeof window !== "undefined";

    if (IS_BROWSER && !window.GA_INITIALIZED) {
      ReactGA.initialize("UA-71896446-6", {
        testMode: process.env.NODE_ENV === "production" ? false : true,
        debug: process.env.NODE_ENV === "production" ? false : true
      });
      window.GA_INITIALIZED = true;
    }

    const location = window.location.pathname + window.location.search;

    ReactGA.pageview(location);
  });

  return (
    <div id="page">
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      <Notifications />

      <MapNavigation />

      <div id="content">
        <main>{children}</main>
      </div>

      <style jsx>{`
        #sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 70px;
          display: flex;
          flex-direction: column;
          background-color: #fff;
        }

        #content {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        main {
          margin-left: ${UiConstants.SIDEBAR_WIDTH}px;
          margin-top: ${UiConstants.HEADER_HEIGHT}px;
          background-color: #f2f2f2;
          flex: 1;
        }
      `}</style>
    </div>
  );
};
