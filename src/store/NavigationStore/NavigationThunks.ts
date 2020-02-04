import { useDispatch, useSelector } from "react-redux";
import { AppState } from "..";
import { addCurrentRouteAction } from "./NavigationActions";

const previousRouteSelector = (state: AppState) =>
  state.navigationStore.previousRoute;

export const useNavigationState = () => {
  const dispatch = useDispatch();
  const previousRoute = useSelector(previousRouteSelector);

  function setCurrentRoute(route: string, title: string = "CSGONades") {
    dispatch(addCurrentRouteAction(route, title));
  }

  return {
    setCurrentRoute,
    previousRoute
  };
};
