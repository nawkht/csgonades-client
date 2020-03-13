import { useContext, useEffect, useState } from "react";
import { NadeApi } from "../../../api/NadeApi";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { NadeFilterContext } from "../context";

export const useLoadLatestsNades = (map: CsgoMap) => {
  const { dispatch } = useContext(NadeFilterContext);
  const [called, setCalled] = useState(false);

  useEffect(() => {
    if (called) {
      return;
    }

    setCalled(true);

    (async () => {
      const result = await NadeApi.getByMap(map);

      if (result.isOk()) {
        dispatch({
          type: "@@nadefilter/REPLACE_NADES",
          payload: result.value,
        });
      }
    })();
  }, [called, dispatch, map]);
};
