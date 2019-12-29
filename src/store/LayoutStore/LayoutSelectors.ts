import { AppState } from "..";

export const uiConstantSelector = (state: AppState) => {
  return state.layoutStore.uiDimensions;
};

export const themeSelector = (state: AppState) => {
  return state.layoutStore;
};

export const isMobileSelector = (state: AppState) => {
  return state.layoutStore.isMobile;
};

export const isNavigationOpenSelector = (state: AppState) => {
  return state.layoutStore.sideBarOpen;
};
