import { NextPage } from "next";
import React from "react";
import { FrontPage } from "../frontpage/FrontPage";
import { fetchSiteStatsThunk } from "../store/GlobalStore/GlobalThunks";
import { fetchNewestNadesAction } from "../store/NadeStore/NadeThunks";
import { withRedux } from "../utils/WithRedux";

const Index: NextPage = () => <FrontPage />;

Index.getInitialProps = async ({ reduxStore }) => {
  const { dispatch } = reduxStore;

  await Promise.all([
    //@ts-ignore
    dispatch(fetchNewestNadesAction()),
    //@ts-ignore
    dispatch(fetchSiteStatsThunk()),
  ]);

  return;
};

export default withRedux(Index);
