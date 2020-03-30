import { Reducer } from "redux";
import { AdActions } from "./actions";

type SlotsForPage = { [slotId: string]: boolean };

export type AdStoreState = {
  displayedAds: SlotsForPage;
  slotsForGroupLoad: number[];
  slotsForRefresh: number[];
};

const initialState: AdStoreState = {
  displayedAds: {},
  slotsForGroupLoad: [],
  slotsForRefresh: [],
};

export const AdReducer: Reducer<AdStoreState, AdActions> = (
  state = initialState,
  action
): AdStoreState => {
  switch (action.type) {
    case "Ads/BeforeNavigationChange":
      return {
        ...state,
        slotsForGroupLoad: [],
        slotsForRefresh: [],
      };
    case "Ads/RegisterPlaceholder":
      const adSlotAsString = action.slot.toString();

      if (state.displayedAds[adSlotAsString]) {
        return {
          ...state,
          slotsForRefresh: [...state.slotsForRefresh, action.slot],
        };
      } else {
        return {
          ...state,
          displayedAds: {
            ...state.displayedAds,
            [adSlotAsString]: true,
          },
          slotsForGroupLoad: [...state.slotsForGroupLoad, action.slot],
        };
      }
    default:
      return state;
  }
};
