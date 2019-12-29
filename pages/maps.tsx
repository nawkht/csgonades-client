import { NextPage } from "next";
import { NadeApi } from "../src/api/NadeApi";
import { MapPage } from "../src/pages/maps/MapPage";
import { GoogleAnalytics } from "../src/utils/GoogleAnalytics";
import { useEffect } from "react";
import { addNadeAction } from "../src/store/NadeStore/NadeActions";
import { useSelector } from "react-redux";
import { nadesSelector } from "../src/store/NadeStore/NadeSelectors";
import { CsgoMap } from "../src/models/Nade/CsGoMap";

interface Props {
  map: CsgoMap;
  apiCallDuration: number;
}

const Map: NextPage<Props> = ({ map, apiCallDuration }) => {
  useEffect(() => {
    GoogleAnalytics.timing("NadeApi.getByMap", "network", apiCallDuration);
  }, []);

  const nades = useSelector(nadesSelector);

  return <MapPage key={map} map={map} nades={nades} />;
};

Map.getInitialProps = async context => {
  const { dispatch } = context.store;
  const map = context.query.name as CsgoMap;

  const timeBefore = Date.now();
  const nadesResult = await NadeApi.getByMap(map);
  const timeAfter = Date.now();
  const apiCallDuration = timeAfter - timeBefore;

  if (nadesResult.isOk()) {
    addNadeAction(nadesResult.value, dispatch);
  }

  return { map, apiCallDuration };
};

export default Map;
