import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminRoutes, changeAdminRouteAction } from "./AdminActions";
import {
  adminRouteSelector,
  adminUsersSelector,
  pendingNadesSelector,
  reportsSelector,
} from "./AdminSelectors";
import {
  fetchPendingNadeThunk,
  fetchReportsThunk,
  fetchUsersThunk,
} from "./AdminThunks";

export const useAdminPage = () => {
  const dispatch = useDispatch();
  const route = useSelector(adminRouteSelector);
  const pendingNades = useSelector(pendingNadesSelector);
  const users = useSelector(adminUsersSelector);
  const reports = useSelector(reportsSelector);

  const changeAdminRoute = useCallback(
    (route: AdminRoutes) => dispatch(changeAdminRouteAction(route)),
    [dispatch]
  );

  const fetchPendingNades = useCallback(() => {
    dispatch(fetchPendingNadeThunk());
  }, [dispatch]);

  const fetchReports = useCallback(() => dispatch(fetchReportsThunk()), [
    dispatch,
  ]);

  const fetchUsers = useCallback(
    (page: number, limit: number, sortByActivity: boolean) =>
      dispatch(fetchUsersThunk(page, limit, sortByActivity)),
    [dispatch]
  );

  return {
    route,
    pendingNades,
    users,
    reports,
    changeAdminRoute,
    fetchPendingNades,
    fetchUsers,
    fetchReportsThunk,
    fetchReports,
  };
};
