import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useIsAdminOrModerator } from "../store/AuthStore/AuthHooks";
import { useAdminRoute } from "../store2/AdminStore/hooks";
import { AdminGallery } from "./AdminGallery/AdminGallery";
import { AdminNav } from "./AdminNav";
import { AdminPendingNades } from "./AdminPendingNades";
import { AdminReports } from "./AdminReports";
import { AdminUsers } from "./AdminUsers";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { AdminDeclined } from "./AdminDeclined";

export const AdminPage: FC = () => {
  const { colors } = useTheme();
  const allowedToView = useIsAdminOrModerator();
  const { route } = useAdminRoute();

  if (!allowedToView) {
    return <p>Your not allowed to view this page :(</p>;
  }

  function pageContent() {
    switch (route) {
      case "pending-nades":
        return <AdminPendingNades />;
      case "user":
        return <AdminUsers />;
      case "reports":
        return <AdminReports />;
      case "gallery":
        return <AdminGallery />;
      case "declined-nades":
        return <AdminDeclined />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="admin-container">
        <div className="admin-content">{pageContent()}</div>
      </div>

      <aside className="admin-nav">
        <AdminNav />
      </aside>
      <style jsx>{`
        .admin-container {
          grid-area: main;
          margin: ${Dimensions.GUTTER_SIZE}
          display: flex;
          margin: 30px;
          background: ${colors.DP01};
          border-radius: 5px;
          overflow: hidden;
          min-height: 80vh;
          padding: 20px 30px;
        }

        .admin-nav {
          grid-area: sidebar;
          margin-right: ${Dimensions.GUTTER_SIZE};
          width: 300px;
          padding: 30px;
        }

        .admin-content {
          flex: 1;
        }
      `}</style>
    </>
  );
};
