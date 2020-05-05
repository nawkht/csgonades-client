import { Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SiteStats } from "../../api/StatsApi";
import { assertNever } from "../../utils/Common";
import { GlobalActions, SignInWarningType } from "./GlobalActions";

export type GlobalState = {
  readonly stats: SiteStats;
  readonly isNavOpen: boolean;
  readonly acceptedCookieConcent: boolean;
  readonly showViewSelectorHint: boolean;
  readonly signInWarning?: SignInWarningType;
};

const initialState: GlobalState = {
  stats: {
    numNades: 0,
    numUsers: 0,
    numPending: 0,
    ezoicEnabled: false,
  },
  isNavOpen: false,
  acceptedCookieConcent: false,
  showViewSelectorHint: true,
};

export const GlobalReducerBase: Reducer<GlobalState, GlobalActions> = (
  state = initialState,
  action
): GlobalState => {
  switch (action.type) {
    case "Global/AddSiteStats":
      return {
        ...state,
        stats: action.stats,
      };
    case "Global/ToggleNavigation":
      return {
        ...state,
        isNavOpen: !state.isNavOpen,
      };
    case "Global/CloseNavigation":
      return {
        ...state,
        isNavOpen: false,
      };
    case "Global/AcceptCookieConcent":
      return {
        ...state,
        acceptedCookieConcent: true,
      };
    case "Global/HideViewSelectorHint":
      return {
        ...state,
        showViewSelectorHint: false,
      };
    case "Global/SetSignInWarning":
      return {
        ...state,
        signInWarning: action.warningType,
      };
    case "Global/ClearSignInWarning":
      return {
        ...state,
        signInWarning: undefined,
      };
    default:
      assertNever(action);
      return state;
  }
};

const persistConfig: PersistConfig<GlobalState> = {
  key: "globalStore",
  whitelist: ["acceptedCookieConcent", "showViewSelectorHint"],
  storage,
};

export const GlobalReducer = persistReducer(persistConfig, GlobalReducerBase);
