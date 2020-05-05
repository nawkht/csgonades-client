import { useMapStoreDispatch } from "./helpers";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useReplaceNadesForMap } from "./useReplaceNadesForMap";
import { NadeLight } from "../../../models/Nade/Nade";

export const useMapChangeHandler = (nades: NadeLight[]) => {
  const { query } = useRouter();
  const dispatch = useMapStoreDispatch();
  const replaceNadesForMap = useReplaceNadesForMap();

  useEffect(() => {
    const csGoMap = query.map as CsgoMap;

    if (!csGoMap) {
      return;
    }

    replaceNadesForMap(csGoMap, nades);
  }, [query, nades, replaceNadesForMap]);

  useEffect(() => {
    const csGoMap = query.map as CsgoMap;

    if (!csGoMap) {
      return;
    }

    dispatch({
      type: "MapStore/SetCurrentMap",
      map: csGoMap,
    });
  }, [query, dispatch]);
};
