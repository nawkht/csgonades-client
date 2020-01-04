import React from "react";
import { NextPage } from "next";
import { FrontPage } from "../src/pages/frontpage/FrontPage";
import { fetchNewestNadesAction } from "../src/store/NadeStore/NadeThunks";
import { fetchSiteStatsThunk } from "../src/store/GlobalStore/GlobalThunks";

const Index: NextPage = props => {
  return <FrontPage />;
};

Index.getInitialProps = async ({ store, req }) => {
  const { dispatch } = store;

  await dispatch(fetchNewestNadesAction());
  await dispatch(fetchSiteStatsThunk());

  return;
};

export default Index;
