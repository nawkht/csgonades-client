import { FC } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { useIsAdminOrModerator } from "../store/AuthStore/AuthHooks";
import { useAdminRoute } from "../store2/AdminStore/hooks";
import { AdminGallery } from "./AdminGallery/AdminGallery";
import { AdminNav } from "./AdminNav";
import { AdminPendingNades } from "./AdminPendingNades";
import { AdminReports } from "./AdminReports";
import { AdminUsers } from "./AdminUsers";

export const AdminPage: FC = () => {
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
      default:
        return null;
    }
  }

  return (
    <>
      <PageCentralize>
        <div className="admin-container">
          <div className="admin-nav">
            <AdminNav />
          </div>
          <div className="admin-content">{pageContent()}</div>
        </div>
      </PageCentralize>
      <style jsx>{`
        .admin-container {
          min-height: 80vh;
          margin-top: 50px;
          margin-bottom: 100px;
          display: flex;
        }

        .admin-nav {
          margin-right: ${Dimensions.GUTTER_SIZE};
        }

        .admin-content {
          flex: 1;
        }
      `}</style>
    </>
  );
};
