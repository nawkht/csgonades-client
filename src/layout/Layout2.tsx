import { FC, lazy, memo, Suspense } from "react";
import { CookieConsent } from "../common/CookieConsent";
import { ToastList } from "../common/toast/ToastList";
import { useIsAdminOrModerator } from "../store/AuthStore/AuthHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { usePageView } from "../utils/Analytics";
import { useSetupSession } from "./DataFetchers/useSetupSession";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageHead } from "./Misc/PageHead";
import { MobileNav } from "./Navigation/MobileNav";
import { useAdRefresher } from "./useAdRefresher";

const AdminLink = lazy(() => import("./Misc/AdminLink"));

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  metaThumbNail?: string;
};

export const Layout2: FC<Props> = memo(
  ({ title, description, canonical, metaThumbNail, children }) => {
    const isAdminOrMod = useIsAdminOrModerator();
    const { colors } = useTheme();
    const pageTitle = title ? `${title} - CSGO Nades` : `CSGO Nades`;
    usePageView(title);
    useSetupSession();
    useAdRefresher();

    return (
      <>
        <div className="page">
          <PageHead
            title={pageTitle}
            description={description}
            canonical={canonical}
            thumbnail={metaThumbNail}
          />

          <div className="header">
            <Header />
          </div>

          <main>{children}</main>

          <div className="footer">
            <Footer />
          </div>

          <ToastList />
          <CookieConsent />
          <MobileNav />

          {isAdminOrMod && (
            <Suspense fallback={<></>}>
              <AdminLink />
            </Suspense>
          )}
        </div>

        <style jsx>{`
          .page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          main {
            flex: 1;
          }
        `}</style>

        <style jsx global>{`
          body {
            background: ${colors.DP00};
            margin: 0;
            padding: 0;
            font-family: "Roboto", Helvetica, sans-serif;
            font-weight: 300;
            font-size: 16px;
          }

          a {
            text-decoration: none;
          }
        `}</style>
      </>
    );
  }
);
