import { FC, memo } from "react";
import { CookieConsent } from "../common/CookieConsent";
import { ToastList } from "../common/toast/ToastList";
import { usePreloadUser } from "../store/AuthStore/AuthHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { usePageView } from "../utils/Analytics";
import { useSetupSession } from "./DataFetchers/useSetupSession";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./Navigation/MobileNav";
import { ServiceDown } from "./ServiceDown";
import { useFetchClientConfig } from "../store/SettingsStore/hooks/useFetchClientConfig";
import { AdminLink } from "./Misc/AdminLink";
import { useAdSlotsHandler } from "../store/AdStore/hooks";

export const Layout2: FC = memo(({ children }) => {
  const { colors } = useTheme();
  useAdSlotsHandler();
  useSetupSession();
  usePageView();
  usePreloadUser();
  useFetchClientConfig();

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
        <AdminLink />
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
        }
      `}</style>
    </>
  );
});
