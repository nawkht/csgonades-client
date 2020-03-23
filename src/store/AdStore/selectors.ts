import { AppState } from "..";

export const adSlotsSelector = (state: AppState) => {
  return state.adStore.slots;
};
