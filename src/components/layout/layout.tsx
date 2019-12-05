import Head from "next/head";
import { Header } from "./header";
import { MapNavigation } from "./navigation";
import { UiConstants } from "../../../constants/ui";
import { Notifications } from "./Notifications";

interface Props {
  title?: string;
}

export const Layout: React.FC<Props> = ({ title = "CSGONades", children }) => {
  return (
    <div id="page">
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      <Notifications />

      <MapNavigation />

      <div id="content">
        <main>{children}</main>
      </div>

      <style jsx>{`
        #sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 70px;
          display: flex;
          flex-direction: column;
          background-color: #fff;
        }

        #content {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        main {
          margin-left: ${UiConstants.SIDEBAR_WIDTH}px;
          margin-top: ${UiConstants.HEADER_HEIGHT}px;
          background-color: #f2f2f2;
          flex: 1;
        }
      `}</style>
    </div>
  );
};
