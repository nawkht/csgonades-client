import { useSelector, useDispatch } from "react-redux";
import {
  uiConstantSelector,
  isMobileSelector,
  isNavigationOpenSelector,
  themeSelector
} from "./LayoutSelectors";
import { toggleNavigationAction } from "./LayoutActions";

export const useTheme = () => {
  const dimensions = useSelector(themeSelector);
  return dimensions;
};

export const useIsMobile = () => {
  const isMobile = useSelector(isMobileSelector);
  return isMobile;
};

export const useIsNavigationOpen = () => {
  const isNavigationOpen = useSelector(isNavigationOpenSelector);
  return isNavigationOpen;
};

export const useToogleNavigation = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(toggleNavigationAction());
  };
};
