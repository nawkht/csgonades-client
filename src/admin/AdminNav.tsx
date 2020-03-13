import { FC } from "react";
import { useAdminRoute } from "../store2/AdminStore/hooks";

export const AdminNav: FC = () => {
  const { changeAdminRoute } = useAdminRoute();

  return (
    <div className="admin-nav">
      <button onClick={() => changeAdminRoute("pending-nades")}>
        Pending nades
      </button>
      <button onClick={() => changeAdminRoute("user")}>Users</button>
      <button onClick={() => changeAdminRoute("reports")}>Reports</button>
      <button onClick={() => changeAdminRoute("blog")}>Blog</button>
      <button onClick={() => changeAdminRoute("gallery")}>Gallery</button>
    </div>
  );
};
