import React from "react";
import { NextPage } from "next";
import { FrontPage } from "../src/pages/frontpage/FrontPage";
import { Nade } from "../src/models/Nade/Nade";
import { serverSideUserInitThunkAction } from "../src/store/AuthStore/AuthTunks";

interface Props {
  nades: Nade[];
}

const Index: NextPage<Props> = props => {
  console.log("Rendering index");
  return <FrontPage nades={props.nades} />;
};

Index.getInitialProps = async ({ store }) => {
  console.log("Index.getInitialProps");
  await store.dispatch(serverSideUserInitThunkAction());
  return { nades: [] };
};

export default Index;
