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
import { Footer } from "./Footer";

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

      <div id="layout">
        <header>
          <Header />
        </header>

        <aside>
          <MapNavigation />
        </aside>

        <main>{children}</main>

        <footer>
          <Footer />
        </footer>
      </div>

      <Notifications />

      <style jsx>{`
        #layout {
          display: grid;
          grid-template-columns: ${uiDimensions.SIDEBAR_WIDTH}px 2fr 2fr 2fr;
          grid-template-rows: ${uiDimensions.HEADER_HEIGHT}px auto 45px;
          grid-template-areas:
            "header header header header"
            "sidebar main main main"
            "footer footer footer footer";
          height: 100vh;
        }

        header {
          grid-area: header;
          max-height: ${uiDimensions.HEADER_HEIGHT}px;
        }

        aside {
          grid-area: sidebar;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
        }

        main {
          grid-area: main;
          overflow-y: auto;
          overflow-x: hidden;
          background: #f3f3f3;
        }

        footer {
          grid-area: footer;
        }

        #page {
          max-height: 100vh;
        }

        #content {
          display: flex;
          max-height: calc(100vh - ${uiDimensions.HEADER_HEIGHT}px);
          border: 1px solid orange;
        }

        .page-content {
          flex: 1;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          #layout {
            grid-template-areas:
              "header header header header"
              "main main main main"
              "footer footer footer footer";
          }
        }
      `}</style>
    </>
  );
};
