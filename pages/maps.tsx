import { NextPage } from "next";
import { MapPage } from "../src/pages/maps/MapPage";
import { CsgoMap } from "../src/models/Nade/CsGoMap";
import { fetchNadesByMapAction } from "../src/store/NadeStore/NadeThunks";
import { resetNadeFilterAction } from "../src/store/NadeStore/NadeActions";

interface Props {
  map: CsgoMap;
}

const Map: NextPage<Props> = ({ map }) => {
  return <MapPage key={map} map={map} />;
};

Map.getInitialProps = async context => {
  const map = context.query.name as CsgoMap;
  const { dispatch } = context.store;

  dispatch(resetNadeFilterAction());
  await dispatch(fetchNadesByMapAction(map));

  return { map };
};

export default Map;
