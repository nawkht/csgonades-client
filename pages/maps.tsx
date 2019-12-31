import { NextPage } from "next";
import { NadeApi } from "../src/api/NadeApi";
import { MapPage } from "../src/pages/maps/MapPage";
import { GoogleAnalytics } from "../src/utils/GoogleAnalytics";
import { useEffect } from "react";
import { addNadeAction } from "../src/store/NadeStore/NadeActions";
import { useSelector } from "react-redux";
import { nadesSelector } from "../src/store/NadeStore/NadeSelectors";
import { CsgoMap } from "../src/models/Nade/CsGoMap";
import { fetchNadesByMapAction } from "../src/store/NadeStore/NadeThunks";

interface Props {
  map: CsgoMap;
}

const Map: NextPage<Props> = ({ map }) => {
  const nades = useSelector(nadesSelector);

  return <MapPage key={map} map={map} nades={nades} />;
};

Map.getInitialProps = async context => {
  const map = context.query.name as CsgoMap;
  const { dispatch } = context.store;

  await dispatch(fetchNadesByMapAction(map));

  return { map };
};

export default Map;
