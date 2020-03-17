import { Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SettingsActions } from "./SettingsActions";
import { ThemeKeys } from "./Themes";
import { ClientConfig } from "../../api/ClientConfigApi";

export type SettingsState = {
  theme: ThemeKeys;
  clientConfig: ClientConfig;
};

const initialState: SettingsState = {
  theme: "light",
  clientConfig: {
    useHardLinks: false,
  },
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
    case "Settings/ReplaceClientConfig":
      return {
        ...state,
        clientConfig: action.config,
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
