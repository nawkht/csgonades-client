import { FC, memo } from "react";
import { CookieConsent } from "../common/CookieConsent";
import { ToastList } from "../common/toast/ToastList";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { usePageView } from "../utils/Analytics";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { AdminLink } from "./Misc/AdminLink";
import { PageHead } from "./Misc/PageHead";
import { MobileNav } from "./Navigation/MobileNav";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  metaThumbNail?: string;
};

export const Layout2: FC<Props> = memo(
  ({ title, description, canonical, metaThumbNail, children }) => {
    const { colors } = useTheme();
    const pageTitle = title ? `${title} - CSGO Nades` : `CSGO Nades`;
    usePageView(title);

    return (
      <>
        <PageHead
          title={pageTitle}
          description={description}
          canonical={canonical}
          thumbnail={metaThumbNail}
        />

        <Header />

        <MobileNav />

        <main>{children}</main>

        <Footer />

        <ToastList />

        <CookieConsent />

        <AdminLink />

        <style jsx global>{`
          body {
            background: ${colors.DP00};
            margin: 0;
            padding: 0;
          }

          a {
            text-decoration: none;
          }
        `}</style>
      </>
    );
  }
);
