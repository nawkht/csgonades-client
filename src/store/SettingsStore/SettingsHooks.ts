import { useDispatch, useSelector } from "react-redux";
import { AppState } from "..";
import { setThemeAction } from "./SettingsActions";
import { themes } from "./Themes";

const themeSelector = (state: AppState) => state.settingsStore.theme;

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const colors = themes[theme];

  const toggleTheme = () => {
    if (theme === "light") {
      dispatch(setThemeAction("dark"));
    } else {
      dispatch(setThemeAction("light"));
    }
  };

  return {
    theme,
    colors,
    toggleTheme
  };
};
