import { useDispatch, useSelector } from "react-redux";
import { AdminRoutes, changeAdminRouteAction } from "./AdminActions";
import {
  adminRouteSelector,
  adminUsersSelector,
  pendingNadesSelector,
  reportsSelector
} from "./AdminSelectors";
import {
  fetchPendingNadeThunk,
  fetchReportsThunk,
  fetchUsersThunk
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
