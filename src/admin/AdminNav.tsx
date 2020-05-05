import { FC } from "react";
import { useAdminRoute } from "../store2/AdminStore/hooks";

export const AdminNav: FC = () => {
  const { changeAdminRoute } = useAdminRoute();

  return (
    <>
      <div className="admin-nav">
        <button onClick={() => changeAdminRoute("pending-nades")}>
          Pending nades
        </button>
        <button onClick={() => changeAdminRoute("declined-nades")}>
          Declined nades
        </button>
        <button onClick={() => changeAdminRoute("user")}>Users</button>
        <button onClick={() => changeAdminRoute("reports")}>Reports</button>
      </div>
      <style jsx>{`
        .admin-nav {
          display: flex;
          flex-direction: column;
        }

        .admin-nav button {
          border: none;
          background: transparent;
          padding: 15px;
          border: 1px solid #bbb;
          margin-bottom: 10px;
          outline: none;
          cursor: pointer;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};
