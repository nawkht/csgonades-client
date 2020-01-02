import { useSelector, useDispatch } from "react-redux";
import { adminRouteSelector, pendingNadesSelector } from "./AdminSelectors";
import { AdminRoutes, changeAdminRouteAction } from "./AdminActions";
import { fetchPendingNadeThunk } from "./AdminThunks";

export const useAdminPage = () => {
  const dispatch = useDispatch();
  const route = useSelector(adminRouteSelector);
  const pendingNades = useSelector(pendingNadesSelector);

  function changeAdminRoute(route: AdminRoutes) {
    dispatch(changeAdminRouteAction(route));
  }

  function fetchPendingNades() {
    dispatch(fetchPendingNadeThunk());
  }

  return {
    route,
    pendingNades,
    changeAdminRoute,
    fetchPendingNades
  };
};
