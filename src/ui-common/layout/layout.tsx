import Head from "next/head";
import { Header } from "./header";
import { MapNavigation } from "./navigation";
import { Notifications } from "./Notifications";
import { useEffect, useState } from "react";
import { useTheme, useThemeSync } from "../../store/LayoutStore/LayoutHooks";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
// @ts-ignore
import removeMd from "remove-markdown";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";

interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  metaThumbNail?: string;
}

export const Layout: React.FC<Props> = ({
  title,
  description,
  children,
  canonical,
  metaThumbNail
}) => {
  const [pathname, setPathname] = useState("");
  useThemeSync();
  const { closeNav } = useNavigation();
  const { uiDimensions } = useTheme();

  useEffect(() => {
    closeNav();
  }, []);

  useEffect(() => {
    let delayedAnalytics = setTimeout(() => {
      const location = window.location.pathname + window.location.search;
      setPathname(window.location.pathname);
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

        <meta
          name="keywords"
          content="dust2 train mirage inferno cobblestone overpass cache nades flashbang smoke incendiary molotov he grenade csgo cs:go counter-strike global offensive"
        />
        <meta name="og:description" content={pageDescription} />
        <meta name="og:title" content={pageTitle} />
        <meta name="og:site_name" content="CSGONades" />
        <meta name="og:type" content="website" />
        <meta name="og:locale" content="en_EN" />
        {canonical && (
          <link
            rel="canonical"
            href={`https://www.csgonades.com${canonical}`}
          />
        )}
        {canonical && (
          <meta
            property="og:url"
            content={`https://www.csgonades.com${canonical}`}
          />
        )}
        {metaThumbNail && <meta property="og:image" content={metaThumbNail} />}
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
