import { NextPage } from "next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FrontPage } from "../frontpage/FrontPage";
import { useFirstRender } from "../store/GlobalStore/GlobalHooks";
import { fetchSiteStatsThunk } from "../store/GlobalStore/GlobalThunks";
import { fetchNewestNadesAction } from "../store/NadeStore/NadeThunks";

const Index: NextPage = () => {
  const dispatch = useDispatch();
  const { firstRender, firstRenderCompleted } = useFirstRender();

  useEffect(() => {
    if (firstRender) {
      firstRenderCompleted();
      dispatch(fetchNewestNadesAction());
      dispatch(fetchSiteStatsThunk());
    }
  }, [firstRender]);

  return <FrontPage />;
};

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
