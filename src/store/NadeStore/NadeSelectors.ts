import { AppState } from "..";
import { useSelector } from "react-redux";

export const nadesSelector = (state: AppState) => {
  return state.nadeStore.nadesForMap;
};

export const sortingMethodSelector = (state: AppState) => {
  return state.nadeStore.sorthingMethod;
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

export const nadeFilterSelector = (state: AppState) =>
  state.nadeStore.nadeFilter;

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
