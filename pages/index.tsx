import React from "react";
import { NextPage } from "next";
import { FrontPage } from "../src/pages/frontpage/FrontPage";
import {
  fetchNewestNadesAction,
  fetchSiteStatsThunk
} from "../src/store/NadeStore/NadeThunks";

const Index: NextPage = props => {
  return <FrontPage />;
};

Index.getInitialProps = async ({ store }) => {
  const { dispatch } = store;

  await dispatch(fetchNewestNadesAction());
  await dispatch(fetchSiteStatsThunk());

  return;
};

export default Index;
