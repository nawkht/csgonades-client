import { FC } from "react";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import { useIsAdminOrModerator } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { Layout } from "../../ui-common/Layout";
import { AdminNav } from "./AdminNav";
import { AdminPendingNades } from "./AdminPendingNades";
import { AdminReports } from "./AdminReports";
import { AdminTournaments } from "./AdminTournaments";
import { AdminUsers } from "./AdminUsers";
import { ArticleEditor } from "./ArticleEditor";

export const AdminPage: FC = () => {
  const theme = useTheme();
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
      default:
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
          margin: ${theme.uiDimensions.OUTER_GUTTER_SIZE}px;
          display: flex;
        }

        .admin-nav {
          margin-right: ${theme.uiDimensions.INNER_GUTTER_SIZE}px;
        }

        .admin-content {
          flex: 1;
        }
      `}</style>
    </Layout>
  );
};
