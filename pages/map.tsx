import { NextPage } from "next";
import { Nade } from "../src/models/Nade";
import { NadeApi } from "../src/api/NadeApi";
import { MapPage } from "../src/pagecontainers/mappage";

interface Props {
  nades: Nade[];
  map: string;
}

const Map: NextPage<Props> = ({ map, nades }) => {
  return <MapPage key={map} map={map} nades={nades} />;
};

Map.getInitialProps = async context => {
  const map = context.query.name as string;
  const nades = await NadeApi.getByMap(map);
  return { nades, map };
};

export default Map;
