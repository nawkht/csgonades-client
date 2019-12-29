import { useSelector, useDispatch } from "react-redux";
import { themeSelector } from "./LayoutSelectors";
import { toggleNavigationAction } from "./LayoutActions";

export const useTheme = () => {
  const dimensions = useSelector(themeSelector);
  return dimensions;
};

export const useToogleNavigation = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(toggleNavigationAction());
  };
};
