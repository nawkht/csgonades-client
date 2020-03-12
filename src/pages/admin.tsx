import { NextPage } from "next";
import React from "react";
import { AdminPage } from "../admin/AdminPage";
import { withRedux } from "../utils/WithRedux";

const Admin: NextPage = () => {
  return <AdminPage />;
};

export default withRedux(Admin);
