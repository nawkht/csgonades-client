import { NextPage } from "next";
import { MapPage } from "../maps/MapPage";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { fetchNadesByMapActionThunk } from "../store/NadeStore/NadeThunks";

interface Props {
  map: CsgoMap;
}

const Map: NextPage<Props> = ({ map }) => {
  return <MapPage key={map} map={map} />;
};

Map.getInitialProps = async context => {
  const map = context.query.name as CsgoMap;
  const { dispatch } = context.store;

  //@ts-ignore
  await dispatch(fetchNadesByMapActionThunk(map));

  return { map };
};

export default Map;
