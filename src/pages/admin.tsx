import { NextPage } from "next";
import React from "react";
import { AdminPage } from "../admin/AdminPage";
import { AdminStoreProvider } from "../store2/AdminStore/context";
import { withRedux } from "../utils/WithRedux";

const Admin: NextPage = () => {
  return (
    <AdminStoreProvider>
      <AdminPage />
    </AdminStoreProvider>
  );
};

export default withRedux(Admin, { ssr: false });
