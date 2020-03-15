import { NextPage } from "next";
import React from "react";
import { AdminPage } from "../admin/AdminPage";
import { AdminStoreProvider } from "../store2/AdminStore/context";
import { SEO } from "../layout/SEO2";

const Admin: NextPage = () => {
  return (
    <>
      <SEO title="Admin" canonical="/admin" />
      <AdminStoreProvider>
        <AdminPage />
      </AdminStoreProvider>
    </>
  );
};

export default Admin;
