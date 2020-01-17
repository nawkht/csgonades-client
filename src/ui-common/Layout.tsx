import Head from "next/head";
import { useEffect, useState } from "react";
// @ts-ignore
import removeMd from "remove-markdown";
import { useNavigation } from "../store/GlobalStore/GlobalHooks";
import { useTheme, useThemeSync } from "../store/LayoutStore/LayoutHooks";
import { GoogleAnalytics } from "../utils/GoogleAnalytics";
import { Footer } from "./layout-components/Footer";
import { Header } from "./layout-components/Header";
import { Navigation } from "./layout-components/Navigation";
import { ToastList } from "./toast/ToastList";

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
  const { uiDimensions, colors } = useTheme();

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
    <>
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

      <header>
        <Header />
      </header>

      <Navigation />

      <div id="layout">
        <main>{children}</main>

        <footer>
          <Footer />
        </footer>
      </div>

      <ToastList />

      <style jsx>{`
        #layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        header {
          max-height: ${uiDimensions.HEADER_HEIGHT}px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 900;
        }

        main {
          background: #f3f3f3;
          margin-left: ${uiDimensions.SIDEBAR_WIDTH}px;
          margin-top: ${uiDimensions.HEADER_HEIGHT}px;
          flex: 1;
        }

        footer {
          margin-left: ${uiDimensions.SIDEBAR_WIDTH}px;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          main {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
};
