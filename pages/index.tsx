import React from "react";
import { NextPage } from "next";
import { FrontPage } from "../src/pages/frontpage/FrontPage";
import { Nade } from "../src/models/Nade/Nade";
import { serverSideUserInitThunkAction } from "../src/store/AuthStore/AuthTunks";

interface Props {
  nades: Nade[];
}

const Index: NextPage<Props> = props => {
  return <FrontPage nades={props.nades} />;
};

Index.getInitialProps = async ({ store }) => {
  return { nades: [] };
};

export default Index;
