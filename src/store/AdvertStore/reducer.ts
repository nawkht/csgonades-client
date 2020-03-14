import { Reducer } from "redux";
import { AdvertActions } from "./actions";

type PageAds = { [location: string]: number[] };

export type AdvertState = {
  pageAds: PageAds;
};

const initialState: AdvertState = {
  pageAds: {},
};

export const AdvertReducer: Reducer<AdvertState, AdvertActions> = (
  state = initialState,
  action
): AdvertState => {
  switch (action.type) {
    case "@@advert/REGISTER_PLACEHOLDER":
      const pageAds = state.pageAds[action.page] || [];
      let newPageAds = [...pageAds, action.code];
      newPageAds = newPageAds.filter(
        (item, index) => newPageAds.indexOf(item) === index
      );
      return {
        ...state,
        pageAds: {
          ...state.pageAds,
          [action.page]: newPageAds,
        },
      };
    default:
      return state;
  }
};
