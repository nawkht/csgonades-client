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
import { CookieConsent } from "../common/CookieConsent";
import { NewNav } from "./NewNav";

export const Layout2: FC = memo(({ children }) => {
  const { colors } = useTheme();
  useSetupSession();
  usePageView();
  usePreloadUser();

  return (
    <>
      <div id="page">
        <header>
          <Header />
        </header>

        <nav>
          <NewNav />
        </nav>

        {children}

        <footer>
          <Footer />
        </footer>
      </div>

      <ServiceDown />
      <ToastList />
      <MobileNav />
      <AdminLink />
      <CookieConsent />

      <style jsx>{`
        .footer-placement {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 50px;
          margin-bottom: 50px;
        }

        #page {
          display: grid;
          min-height: 100vh;
          width: 100%;
          background: ${colors.DP00};
          grid-template-columns: auto 1fr auto;
          grid-template-areas:
            "header header header"
            "nav main sidebar"
            "footer footer footer";
        }

        header {
          grid-area: header;
          position: sticky;
          top: 0;
          z-index: 999;
        }

        nav {
          grid-area: nav;
          padding-left: 30px;
        }

        footer {
          grid-area: footer;
        }

        @media only screen and (max-width: 1210px) {
          #page {
            grid-template-areas:
              "header header header"
              "nav main main"
              "nav sidebar sidebar"
              "footer footer footer";
          }
        }

        @media only screen and (max-width: 910px) {
          #page {
            grid-template-areas:
              "header header header"
              "main main main"
              "sidebar sidebar sidebar"
              "footer footer footer";
          }

          nav {
            display: none;
          }
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
