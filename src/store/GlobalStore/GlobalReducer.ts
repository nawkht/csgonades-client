import { Reducer } from "redux";
import { SiteStats } from "../../api/StatsApi";
import { GlobalActions } from "./GlobalActions";

export type GlobalState = {
  stats: SiteStats;
};

const initialState: GlobalState = {
  stats: {
    numNades: 0,
    numUsers: 0,
    numPending: 0
  }
};

export const GlobalReducer: Reducer<GlobalState, GlobalActions> = (
  state = initialState,
  action
): GlobalState => {
  switch (action.type) {
    case "@@global/ADD_SITE_STATS":
      return {
        ...state,
        stats: action.stats
      };
    default:
      return state;
  }
};
