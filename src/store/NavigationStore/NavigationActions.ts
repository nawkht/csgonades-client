type AddCurrentRoute = {
  type: "@@navigation/ADD_CURRENT_ROUTE";
  route: string;
};

export const addCurrentRouteAction = (route: string): AddCurrentRoute => ({
  type: "@@navigation/ADD_CURRENT_ROUTE",
  route
});

export type NavigationActions = AddCurrentRoute;
