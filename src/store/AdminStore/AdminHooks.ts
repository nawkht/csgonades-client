import { useSelector, useDispatch } from "react-redux";
import {
  adminRouteSelector,
  pendingNadesSelector,
  adminUsersSelector,
  reportsSelector
} from "./AdminSelectors";
import { AdminRoutes, changeAdminRouteAction } from "./AdminActions";
import {
  fetchPendingNadeThunk,
  fetchUsersThunk,
  fetchReportsThunk
} from "./AdminThunks";

export const useAdminPage = () => {
  const dispatch = useDispatch();
  const route = useSelector(adminRouteSelector);
  const pendingNades = useSelector(pendingNadesSelector);
  const users = useSelector(adminUsersSelector);
  const reports = useSelector(reportsSelector);

  function changeAdminRoute(route: AdminRoutes) {
    dispatch(changeAdminRouteAction(route));
  }

  function fetchPendingNades() {
    dispatch(fetchPendingNadeThunk());
  }

  function fetchReports() {
    dispatch(fetchReportsThunk());
  }

  function fetchUsers(page: number, limit: number, sortByActivity: boolean) {
    dispatch(fetchUsersThunk(page, limit, sortByActivity));
  }

  return {
    route,
    pendingNades,
    users,
    reports,
    changeAdminRoute,
    fetchPendingNades,
    fetchUsers,
    fetchReportsThunk,
    fetchReports
  };
};
