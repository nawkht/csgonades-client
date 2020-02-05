import { Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SettingsActions } from "./SettingsActions";
import { ThemeKeys } from "./Themes";

export type SettingsState = {
  theme: ThemeKeys;
};

const initialState: SettingsState = {
  theme: "light",
};

const SettingsReducer: Reducer<SettingsState, SettingsActions> = (
  state = initialState,
  action
): SettingsState => {
  switch (action.type) {
    case "@@settings/SET_THEME":
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

const persistConfig: PersistConfig<SettingsState> = {
  key: "settingStore",
  storage,
};

export const PersistedSettingsReducer = persistReducer(
  persistConfig,
  SettingsReducer
);
