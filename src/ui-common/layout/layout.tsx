import Head from "next/head";
import { Header } from "./header";
import { MapNavigation } from "./navigation";
import { Notifications } from "./Notifications";
import { useEffect, useState } from "react";
import { useUpdateLayout } from "../../utils/CommonHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
// @ts-ignore
import removeMd from "remove-markdown";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";

interface Props {
  title?: string;
  description?: string;
}

export const Layout: React.FC<Props> = ({ title, description, children }) => {
  const { closeNav } = useNavigation();
  useUpdateLayout();
  const { uiDimensions } = useTheme();

  useEffect(() => {
    closeNav();
  }, []);

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
        <meta
          name="keywords"
          content="de_dust2 de_train de_mirage de_inferno de_cbble de_overpass de_cache nades flashbang smoke incendiary molotov he grenade csgo cs:go counter-strike global offensive"
        />
      </Head>

      <Header />

      <Notifications />

      <MapNavigation />

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
          margin-left: ${uiDimensions.SIDEBAR_WIDTH}px;
          margin-top: ${uiDimensions.HEADER_HEIGHT}px;
          background-color: #f2f2f2;
          flex: 1;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};
