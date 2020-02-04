import { Meta } from "../Analytics/AnalyticsMiddleware";

type AddCurrentRoute = {
  type: "@@navigation/ADD_CURRENT_ROUTE";
  route: string;
  meta: Meta;
};

export const addCurrentRouteAction = (
  route: string,
  title: string
): AddCurrentRoute => ({
  type: "@@navigation/ADD_CURRENT_ROUTE",
  route,
  meta: {
    gaPageView: {
      path: route,
      title: title
    }
  }
});

export type NavigationActions = AddCurrentRoute;
