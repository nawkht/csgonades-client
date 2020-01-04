import { useSelector, useDispatch } from "react-redux";
import {
  adminRouteSelector,
  pendingNadesSelector,
  adminUsersSelector
} from "./AdminSelectors";
import { AdminRoutes, changeAdminRouteAction } from "./AdminActions";
import { fetchPendingNadeThunk, fetchUsersThunk } from "./AdminThunks";

export const useAdminPage = () => {
  const dispatch = useDispatch();
  const route = useSelector(adminRouteSelector);
  const pendingNades = useSelector(pendingNadesSelector);
  const users = useSelector(adminUsersSelector);

  function changeAdminRoute(route: AdminRoutes) {
    dispatch(changeAdminRouteAction(route));
  }

  function fetchPendingNades() {
    dispatch(fetchPendingNadeThunk());
  }

  function fetchUsers() {
    dispatch(fetchUsersThunk());
  }

  return {
    route,
    pendingNades,
    users,
    changeAdminRoute,
    fetchPendingNades,
    fetchUsers
  };
};
