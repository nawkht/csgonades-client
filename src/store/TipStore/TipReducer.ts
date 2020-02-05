import { Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TipActions } from "./TipActions";

type TipState = {
  seenFavoriteTip: boolean;
  hasOpenedMapView: boolean;
};

const INITIAL_STATE: TipState = {
  hasOpenedMapView: false,
  seenFavoriteTip: false,
};

export type TipKeys = keyof typeof INITIAL_STATE;

const TipReducer: Reducer<TipState, TipActions> = (
  state = INITIAL_STATE,
  action
): TipState => {
  switch (action.type) {
    case "@@tip/SEEN_TIP":
      return {
        ...state,
        [action.tip]: true,
      };
    default:
      return state;
  }
};

const persistConfig: PersistConfig<TipState> = {
  key: "tipStore",
  storage,
};

export const PersistedTipReducer = persistReducer(persistConfig, TipReducer);
