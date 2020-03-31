import { GetStaticProps, NextPage } from "next";
import React from "react";
import { NadeApi } from "../api/NadeApi";
import { FrontPage } from "../frontpage/FrontPage";
import { NadeLight } from "../models/Nade/Nade";
import { SEO } from "../layout/SEO2";
import { StatsApi, SiteStats } from "../api/StatsApi";

type Props = {
  recentNades: NadeLight[];
  stats: SiteStats | null;
};

const Index: NextPage<Props> = ({ recentNades, stats }) => (
  <>
    <SEO canonical="/" />
    <FrontPage recentNades={recentNades} stats={stats} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  let stats: SiteStats | null = null;
  let recentNades: NadeLight[] = [];

  const result = await NadeApi.getAll();
  const statsResult = await StatsApi.getStats();

  if (statsResult.isOk()) {
    stats = statsResult.value;
  }

  if (result.isOk()) {
    recentNades = result.value;
  }

  return {
    props: {
      recentNades,
      stats,
    },
  };
};

export default Index;
