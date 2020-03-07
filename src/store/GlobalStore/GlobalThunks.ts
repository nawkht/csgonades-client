import axios from "axios";
import { StatsApi } from "../../api/StatsApi";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  addCountryCodeAction,
  addSiteStatsActon,
  didTryFetchingCountryCodeAction,
} from "./GlobalActions";
import { didTryFetchingCountryCodeSelector } from "./GlobalSelectors";

export const fetchSiteStatsThunk = (): ReduxThunkAction => {
  return async dispatch => {
    const result = await StatsApi.getStats();

    if (result.isErr()) {
      console.error(result.error);
      return;
    }

    return dispatch(addSiteStatsActon(result.value));
  };
};

export const fetchUserCountryCodeThunk = (): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const didTryFetchingCountryCode = didTryFetchingCountryCodeSelector(state);

    if (didTryFetchingCountryCode) {
      return;
    }

    try {
      console.log("Fetching user country");
      dispatch(didTryFetchingCountryCodeAction());
      const res = await axios.get("https://ipapi.co/json/");
      const data = res.data;
      const countryCode = data.country_code;

      dispatch(addCountryCodeAction(countryCode));
    } catch (error) {
      // no-op
    }
  };
};
