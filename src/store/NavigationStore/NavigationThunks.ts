import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "..";
import { addCurrentRouteAction } from "./NavigationActions";

const previousRouteSelector = (state: AppState) =>
  state.navigationStore.previousRoute;

export const useNavigationState = () => {
  const dispatch = useDispatch();
  const previousRoute = useSelector(previousRouteSelector);

  const setCurrentRoute = useCallback(
    (route: string, title = "CSGONades") => {
      dispatch(addCurrentRouteAction(route, title));
    },
    [dispatch]
  );

  return {
    setCurrentRoute,
    previousRoute,
  };
};
