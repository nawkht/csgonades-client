import { Reducer } from "redux";
import { AdActions } from "./actions";

export type AdStoreState = {
  slots: number[];
};

const initialState: AdStoreState = {
  slots: [],
};

export const AdReducer: Reducer<AdStoreState, AdActions> = (
  state = initialState,
  action
): AdStoreState => {
  switch (action.type) {
    case "Ads/ClearAdSlots":
      return {
        ...state,
        slots: [],
      };
    case "Ads/RegisterPlaceholder":
      return {
        ...state,
        slots: [...state.slots, action.slot],
      };
    default:
      return state;
  }
};
