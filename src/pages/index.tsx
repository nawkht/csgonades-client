import { NextPage } from "next";
import React from "react";
import { FrontPage } from "../frontpage/FrontPage";
import { fetchSiteStatsThunk } from "../store/GlobalStore/GlobalThunks";
import { fetchNewestNadesAction } from "../store/NadeStore/NadeThunks";

const Index: NextPage = () => <FrontPage />;

Index.getInitialProps = async ({ store }) => {
  const { dispatch } = store;

  await Promise.all([
    //@ts-ignore
    dispatch(fetchNewestNadesAction()),
    //@ts-ignore
    dispatch(fetchSiteStatsThunk()),
  ]);

  return;
};

export default Index;
