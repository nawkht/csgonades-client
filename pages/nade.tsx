import { NextPage } from "next";
import { Nade } from "../src/models/Nade";
import { NadeApi } from "../src/api/NadeApi";
import { NadePage } from "../src/pages/nades/NadePage";
import { useEffect } from "react";
import { GoogleAnalytics } from "../src/utils/GoogleAnalytics";

interface Props {
  nade: Nade | null;
  apiCallDuration: number;
}

const NadePageComponent: NextPage<Props> = ({ nade, apiCallDuration }) => {
  useEffect(() => {
    GoogleAnalytics.timing("NadeApi.byId", "network", apiCallDuration);
  }, []);

  console.log("Rendering NadePageComponent");

  if (!nade) {
    return null;
  }

  return <NadePage nade={nade} />;
};

NadePageComponent.getInitialProps = async context => {
  const nadeId = context.query.id as string;

  const timeBefore = Date.now();
  const nade = await NadeApi.byId(nadeId);
  const timeAfter = Date.now();
  const diff = timeAfter - timeBefore;

  return { nade, apiCallDuration: diff };
};

export default NadePageComponent;
