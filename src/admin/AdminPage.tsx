import { FC } from "react";
import { Layout } from "../common/Layout";
import { Dimensions } from "../constants/Constants";
import { useAdminPage } from "../store/AdminStore/AdminHooks";
import { useIsAdminOrModerator } from "../store/AuthStore/AuthHooks";
import { assertNever } from "../utils/Common";
import { AdminGallery } from "./AdminGallery/AdminGallery";
import { AdminNav } from "./AdminNav";
import { AdminPendingNades } from "./AdminPendingNades";
import { AdminReports } from "./AdminReports";
import { AdminTournaments } from "./AdminTournaments";
import { AdminUsers } from "./AdminUsers";
import { ArticleEditor } from "./ArticleEditor";

export const AdminPage: FC = () => {
  const allowedToView = useIsAdminOrModerator();
  const { route } = useAdminPage();

  if (!allowedToView) {
    return <p>Your not allowed to view this page :(</p>;
  }

  function pageContent() {
    switch (route) {
      case "pending-nades":
        return <AdminPendingNades />;
      case "user":
        return <AdminUsers />;
      case "tournaments":
        return <AdminTournaments />;
      case "reports":
        return <AdminReports />;
      case "write-article":
        return <ArticleEditor />;
      case "gallery":
        return <AdminGallery />;
      default:
        assertNever(route);
        return null;
    }
  }

  return (
    <Layout title="Admin" canonical="/admin">
      <div className="admin-container">
        <div className="admin-nav">
          <AdminNav />
        </div>
        <div className="admin-content">{pageContent()}</div>
      </div>
      <style jsx>{`
        .admin-container {
          margin: ${Dimensions.GUTTER_SIZE};
          display: flex;
        }

        .admin-nav {
          margin-right: ${Dimensions.GUTTER_SIZE};
        }

        .admin-content {
          flex: 1;
        }
      `}</style>
    </Layout>
  );
};
