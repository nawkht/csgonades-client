import { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MapPage } from "../../maps2/MapPage";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useFirstRender } from "../../store/GlobalStore/GlobalHooks";
import { resetNadeFilterAction } from "../../store/NadeFilterStore/NadeFilterActions";
import { fetchNadesByMapActionThunk } from "../../store/NadeStore/NadeThunks";

interface Props {
  map: CsgoMap;
}

const Map: NextPage<Props> = ({ map }) => {
  const dispatch = useDispatch();
  const { firstRender, firstRenderCompleted } = useFirstRender();

  useEffect(() => {
    if (firstRender) {
      dispatch(fetchNadesByMapActionThunk(map));
      firstRenderCompleted();
    }
  }, [firstRender]);

  return <MapPage key={map} map={map} />;
};

Map.getInitialProps = async context => {
  const map = context.query.map as CsgoMap;
  const { dispatch } = context.store;

  //@ts-ignore
  await dispatch(fetchNadesByMapActionThunk(map));
  dispatch(resetNadeFilterAction(true));

  return { map };
};

export default Map;
