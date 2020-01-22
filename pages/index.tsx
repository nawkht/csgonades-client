import { NextPage } from "next";
import React from "react";
import { FrontPage } from "../src/pages/frontpage/FrontPage";
import { fetchSiteStatsThunk } from "../src/store/GlobalStore/GlobalThunks";
import { fetchNewestNadesAction } from "../src/store/NadeStore/NadeThunks";
import { fetchTournamentsThunk } from "../src/store/TournamentStore/TournamentThunks";

const Index: NextPage = () => {
  return <FrontPage />;
};

Index.getInitialProps = async ({ store }) => {
  const { dispatch } = store;

  await Promise.all([
    dispatch(fetchTournamentsThunk()),
    dispatch(fetchNewestNadesAction()),
    dispatch(fetchSiteStatsThunk())
  ]);

  return;
};

export default Index;
