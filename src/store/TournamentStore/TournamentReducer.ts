import { Reducer } from "redux";

import { Tournament } from "../../models/Tournament";
import { TournamentActions } from "./TournamentActions";

export type TournamentState = {
  tournaments: Tournament[];
};

const initialState: TournamentState = {
  tournaments: []
};

export const TournamentReducer: Reducer<TournamentState, TournamentActions> = (
  state = initialState,
  action
): TournamentState => {
  switch (action.type) {
    case "@@tournament/ADD_LIST":
      return {
        ...state,
        tournaments: action.tournaments
      };
    default:
      return state;
  }
};
