import { AppState } from "..";
import { useSelector } from "react-redux";

export const nadesSelector = (state: AppState) => {
  return state.nadeStore.nades;
};

export const selectedNadeSelector = (state: AppState) => {
  return state.nadeStore.selectedNade;
};

export const useIsLoadingNade = () => {
  const isLoading = useSelector((state: AppState) => state.nadeStore.loading);
  return isLoading;
};
