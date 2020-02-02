import { Reducer } from "redux";
import { NavigationActions } from "./NavigationActions";

export type NavigationState = {
  currentRoute?: string;
  previousRoute?: string;
};

const initialState: NavigationState = {};

export const NavigationReducer: Reducer<NavigationState, NavigationActions> = (
  state = initialState,
  action
): NavigationState => {
  switch (action.type) {
    case "@@navigation/ADD_CURRENT_ROUTE":
      return {
        ...state,
        currentRoute: action.route,
        previousRoute: state.currentRoute
      };
    default:
      return state;
  }
};
