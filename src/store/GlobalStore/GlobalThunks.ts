import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { StatsApi } from "../../api/StatsApi";
import { addSiteStatsActon } from "./GlobalActions";

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
