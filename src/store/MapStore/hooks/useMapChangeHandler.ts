import { useMapStoreDispatch } from "./helpers";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CsgoMap } from "../../../models/Nade/CsGoMap";

export const useMapChangeHandler = () => {
  const { query } = useRouter();
  const dispatch = useMapStoreDispatch();

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
