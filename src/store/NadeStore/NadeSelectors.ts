import { useSelector } from "react-redux";
import { AppState } from "..";
import { CsgoMap } from "../../models/Nade/CsGoMap";

export const nadesForMapSelector = (map: CsgoMap) => {
  return (state: AppState) => {
    return state.nadeStore.nadesByMap[map]?.nades;
  };
};

export const filterForMapSelector = (map: CsgoMap) => {
  return (state: AppState) => {
    return state.nadeStore.filterByMap[map];
  };
};

export const nadesForMapTimeSinceFetchSelector = (map: CsgoMap) => {
  return (state: AppState) => {
    return state.nadeStore.nadesByMap[map]?.addedAt;
  };
};

export const recentNadesSelector = (state: AppState) => {
  return state.nadeStore.recentNades;
};

const selectedNadeSelector = (state: AppState) => {
  return state.nadeStore.selectedNade;
};

const nadeLoadingSelector = (state: AppState) =>
  state.nadeStore.loadingNadesForMap;

export const nadeErrorSelector = (state: AppState) => {
  return state.nadeStore.error;
};

export const postionModalOpenSelector = (state: AppState) =>
  state.nadeStore.positionModalOpen;

export const useIsLoadingNade = () => {
  const isLoading = useSelector(nadeLoadingSelector);
  return isLoading;
};

export const useSelectedNade = () => {
  const selectedNade = useSelector(selectedNadeSelector);
  return selectedNade;
};

export const useNadeError = () => {
  const nadeError = useSelector(nadeErrorSelector);
  return nadeError;
};
