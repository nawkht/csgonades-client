import { FC, lazy, memo, Suspense } from "react";
import { CookieConsent } from "../common/CookieConsent";
import { ToastList } from "../common/toast/ToastList";
import {
  useIsAdminOrModerator,
  usePreloadUser,
} from "../store/AuthStore/AuthHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { usePageView } from "../utils/Analytics";
import { useSetupSession } from "./DataFetchers/useSetupSession";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./Navigation/MobileNav";
import { useAdRefresher } from "./useAdRefresher";
import { useAdBlockMetrics } from "./useAdBlockMetrics";
import { ServiceDown } from "./ServiceDown";
import { useFetchClientConfig } from "../store/SettingsStore/hooks/useFetchClientConfig";

const AdminLink = lazy(() => import("./Misc/AdminLink"));

export const Layout2: FC = memo(({ children }) => {
  const isAdminOrMod = useIsAdminOrModerator();
  const { colors } = useTheme();
  useSetupSession();
  usePageView();
  useAdRefresher();
  usePreloadUser();
  useFetchClientConfig();
  useAdBlockMetrics();

  return (
    <>
      <div className="page">
        <ServiceDown />
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
});
