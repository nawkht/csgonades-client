import { useEffect, useState } from "react";
import { NadeApi } from "../../../api/NadeApi";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useNadeFilterState } from "../context";

export const useLoadLatestsNades = (map: CsgoMap) => {
  const { dispatch } = useNadeFilterState();
  const [called, setCalled] = useState(false);

  useEffect(() => {
    if (called) {
      return;
    }

    (async () => {
      const result = await NadeApi.getByMap(map);

      if (result.isOk()) {
        console.log("> Fetched newest nades", map);
        dispatch({
          type: "@@nadefilter/REPLACE_NADES",
          payload: result.value,
        });
        setCalled(true);
      }
    })();
  }, [called, dispatch, map]);
};
