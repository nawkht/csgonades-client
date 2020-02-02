import Head from "next/head";
import { useEffect, useMemo } from "react";
// @ts-ignore
import removeMd from "remove-markdown";
import { AnimationTimings, Dimensions } from "../constants/Constants";
import { useNavigation } from "../store/GlobalStore/GlobalHooks";
import { useNavigationState } from "../store/NavigationStore/NavigationThunks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
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
  const { setCurrentRoute } = useNavigationState();
  const { closeNav, isNavOpen } = useNavigation();
  const { colors } = useTheme();

  const mobileNavClassName = useMemo(() => {
    if (isNavOpen) {
      return "open";
    }
  }, [isNavOpen]);

  useEffect(() => {
    closeNav();
  }, []);

  useEffect(() => {
    let delayedAnalytics = setTimeout(() => {
      const location = window.location.pathname + window.location.search;
      GoogleAnalytics.pageView(location);
      setCurrentRoute(location);
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

      <aside id="navigation">
        <Navigation />
      </aside>

      <aside id="mobile-navigation" className={mobileNavClassName}>
        <Navigation />
      </aside>

      <div id="layout">
        <main>{children}</main>

        <Footer />
      </div>

      <ToastList />

      <style jsx>{`
        #layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        header {
          max-height: ${Dimensions.HEADER_HEIGHT};
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 900;
        }

        main {
          background: ${colors.DP00};
          margin-left: ${Dimensions.SIDEBAR_WIDTH};
          margin-top: ${Dimensions.HEADER_HEIGHT};
          flex: 1;
        }

        #navigation,
        #mobile-navigation {
          position: fixed;
          top: ${Dimensions.HEADER_HEIGHT};
          left: 0;
          bottom: 0;
          z-index: 999;
          border-right: 1px solid ${colors.BORDER};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: auto;
          overflow-x: hidden;
          background: ${colors.DP02};
          width: ${Dimensions.SIDEBAR_WIDTH};
        }

        #mobile-navigation {
          transform: translateX(-100%);
          transition: transform ${AnimationTimings.fast};
        }

        #mobile-navigation.open {
          transform: translateX(0);
        }

        #mobile-navigation {
          display: none;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          main {
            margin-left: 0;
          }

          #navigation {
            display: none;
          }

          #mobile-navigation {
            display: block;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: ${colors.DP02};
        }
      `}</style>
    </>
  );
};
