import { NextPage } from "next";
import React from "react";
import { FrontPage } from "../frontpage/FrontPage";
import { fetchNewestNadesAction } from "../store/NadeStore/NadeThunks";

const Index: NextPage = () => {
  return <FrontPage />;
};

Index.getInitialProps = async ({ store }) => {
  const { dispatch } = store;

  await Promise.all([
    //@ts-ignore
    dispatch(fetchNewestNadesAction()),
  ]);

  return;
};

export default Index;
