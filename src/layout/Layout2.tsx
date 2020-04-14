import { FC, memo } from "react";
import { ToastList } from "../common/toast/ToastList";
import { usePreloadUser } from "../store/AuthStore/AuthHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { usePageView } from "../utils/Analytics";
import { useSetupSession } from "./DataFetchers/useSetupSession";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./Navigation/MobileNav";
import { ServiceDown } from "./ServiceDown";
import { AdminLink } from "./Misc/AdminLink";
import { AdUnit } from "../common/adunits/AdUnit";

export const Layout2: FC = memo(({ children }) => {
  const { colors } = useTheme();
  useSetupSession();
  usePageView();
  usePreloadUser();

  return (
    <>
      <div className="page">
        <ServiceDown />
        <div className="header">
          <Header />
        </div>

        <main>{children}</main>

        <div className="footer-placement">
          <AdUnit tagType="mega-bottom" />
        </div>

        <div className="footer">
          <Footer />
        </div>

        <ToastList />
        <MobileNav />
        <AdminLink />
      </div>

      <style jsx>{`
        .footer-placement {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 50px;
          margin-bottom: 50px;
        }

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

        /** Ad styles */
        .qc-cmp-button,
        .qc-cmp-button.qc-cmp-secondary-button:hover {
          background-color: #000000 !important;
          border-color: #000000 !important;
        }
        .qc-cmp-button:hover,
        .qc-cmp-button.qc-cmp-secondary-button {
          background-color: transparent !important;
          border-color: #000000 !important;
        }
        .qc-cmp-alt-action,
        .qc-cmp-link {
          color: #000000 !important;
        }
        .qc-cmp-button,
        .qc-cmp-button.qc-cmp-secondary-button:hover {
          color: #ffffff !important;
        }
        .qc-cmp-button:hover,
        .qc-cmp-button.qc-cmp-secondary-button {
          color: #000000 !important;
        }
        .qc-cmp-small-toggle,
        .qc-cmp-toggle {
          background-color: #000000 !important;
          border-color: #000000 !important;
        }
        .qc-cmp-main-messaging,
        .qc-cmp-messaging,
        .qc-cmp-sub-title,
        .qc-cmp-privacy-settings-title,
        .qc-cmp-purpose-list,
        .qc-cmp-tab,
        .qc-cmp-title,
        .qc-cmp-vendor-list,
        .qc-cmp-vendor-list-title,
        .qc-cmp-enabled-cell,
        .qc-cmp-toggle-status,
        .qc-cmp-table,
        .qc-cmp-table-header {
          color: #000000 !important;
        }

        .qc-cmp-ui {
          background-color: #ffffff !important;
        }

        .qc-cmp-table,
        .qc-cmp-table-row {
          border: 1px solid !important;
          border-color: #000000 !important;
        }
        #qcCmpButtons a {
          text-decoration: none !important;
        }

        .qc-cmp-qc-link-container {
          display: none;
        }
      `}</style>
    </>
  );
});
