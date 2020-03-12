import { AppState } from "..";
import { CsgoMap } from "../../models/Nade/CsGoMap";

export const nadesForMapSelector = (map?: CsgoMap) => {
  return (state: AppState) => {
    if (!map) {
      return [];
    }
    return state.nadeStore.nadesByMap[map]?.nades;
  };
};

export const nadesForMapTimeSinceFetchSelector = (map: CsgoMap) => {
  return (state: AppState) => {
    return state.nadeStore.nadesByMap[map]?.addedAt;
  };
};
