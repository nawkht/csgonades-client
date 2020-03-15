import { useMapStoreDispatch } from "./helpers";
import { useEffect } from "react";
import { NadeApi } from "../../../api/NadeApi";
import { useRouter } from "next/router";
import { CsgoMap } from "../../../models/Nade/CsGoMap";

export const useMapChangeHandler = () => {
  const { query } = useRouter();
  const dispatch = useMapStoreDispatch();

  useEffect(() => {
    const csGoMap = query["map"] as CsgoMap;

    if (!csGoMap) {
      return;
    }

    dispatch({
      type: "MapStore/SetCurrentMap",
      map: csGoMap,
    });

    (async () => {
      const result = await NadeApi.getByMap(csGoMap);
      if (result.isOk()) {
        dispatch({
          type: "MapStore/ReplaceNadesForMap",
          map: csGoMap,
          nades: result.value,
        });
      }
    })();
  }, [query, dispatch]);
};
