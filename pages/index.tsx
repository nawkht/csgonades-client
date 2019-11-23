import React from "react";
import { NextPage } from "next";
import { FrontPage } from "../src/pagecontainers/frontpage";
//import { NadeApi } from "../frontend/api/NadeApi";
import { Nade } from "../src/models/Nade";

interface Props {
  nades: Nade[];
}

const Index: NextPage<Props> = props => {
  return <FrontPage nades={props.nades} />;
};

Index.getInitialProps = async context => {
  console.log("Store", context.store.getState());
  //const nades = await NadeApi.getAll();
  return { nades: [] };
};

export default Index;
