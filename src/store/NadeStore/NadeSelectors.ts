import { AppState } from "..";
import { useSelector } from "react-redux";

export const nadesSelector = (state: AppState) => {
  return state.nadeStore.nades;
};

const selectedNadeSelector = (state: AppState) => {
  return state.nadeStore.selectedNade;
};

const nadeLoadingSelector = (state: AppState) => state.nadeStore.loading;

export const useIsLoadingNade = () => {
  const isLoading = useSelector(nadeLoadingSelector);
  return isLoading;
};

export const useSelectedNade = () => {
  const selectedNade = useSelector(selectedNadeSelector);
  return selectedNade;
};
