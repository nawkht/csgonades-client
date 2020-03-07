import Head from "next/head";
import { FC, useEffect } from "react";
// @ts-ignore
import removeMd from "remove-markdown";
import { useNavigationState } from "../../store/NavigationStore/NavigationThunks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  metaThumbNail?: string;
};

export const Layout2: FC<Props> = ({
  title,
  description,
  canonical,
  metaThumbNail,
  children,
}) => {
  const { setCurrentRoute } = useNavigationState();
  const { colors } = useTheme();

  const pageTitle = title ? `${title} - CSGO Nades` : `CSGO Nades`;

  useEffect(() => {
    const delayedAnalytics = setTimeout(() => {
      const location = window.location.pathname + window.location.search;
      setCurrentRoute(location, title);
    }, 500);
    return () => {
      if (delayedAnalytics) {
        clearTimeout(delayedAnalytics);
      }
    };
  }, [setCurrentRoute, title]);

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

      <Header />

      <main>{children}</main>

      <Footer />

      <style jsx global>{`
        body {
          background: ${colors.DP00};
        }
      `}</style>
    </>
  );
};
