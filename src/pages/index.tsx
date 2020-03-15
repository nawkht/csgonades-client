import { GetStaticProps, NextPage } from "next";
import React from "react";
import { NadeApi } from "../api/NadeApi";
import { FrontPage } from "../frontpage/FrontPage";
import { NadeLight } from "../models/Nade/Nade";

type Props = {
  recentNades: NadeLight[];
};

const Index: NextPage<Props> = ({ recentNades }) => (
  <FrontPage recentNades={recentNades} />
);

export const getStaticProps: GetStaticProps = async () => {
  const result = await NadeApi.getAll();

  if (result.isErr()) {
    console.error(result.error);
    return {
      props: {
        recentNades: [],
      },
    };
  }

  return {
    props: {
      recentNades: result.value,
    },
  };
};

export default Index;
