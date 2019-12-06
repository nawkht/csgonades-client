import { NextPage } from "next";
import { Nade } from "../src/models/Nade";
import { NadeApi } from "../src/api/NadeApi";
import { MapPage } from "../src/pagecontainers/mappage";
import { GoogleAnalytics } from "../src/utils/GoogleAnalytics";
import { useEffect } from "react";

interface Props {
  nades: Nade[];
  map: string;
  apiCallDuration: number;
}

const Map: NextPage<Props> = ({ map, nades, apiCallDuration }) => {
  useEffect(() => {
    GoogleAnalytics.timing("NadeApi.getByMap", "network", apiCallDuration);
  });

  return <MapPage key={map} map={map} nades={nades} />;
};

Map.getInitialProps = async context => {
  const map = context.query.name as string;

  const timeBefore = Date.now();
  const nades = await NadeApi.getByMap(map);
  const timeAfter = Date.now();
  const apiCallDuration = timeAfter - timeBefore;
  return { nades, map, apiCallDuration };
};

export default Map;
