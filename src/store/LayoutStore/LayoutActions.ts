type LayoutSetMobile = {
  type: "@@layout/SET_MOBILE";
};

type LayoutSetBrowser = {
  type: "@@layout/SET_BROWSER";
};

type LayoutToggleNavigation = {
  type: "@@layout/TOGGLE_NAVIGATION";
};

export type LayoutActions =
  | LayoutSetMobile
  | LayoutSetBrowser
  | LayoutToggleNavigation;

export const setMobileAction = (): LayoutSetMobile => ({
  type: "@@layout/SET_MOBILE"
});

export const setBrowseraction = (): LayoutSetBrowser => ({
  type: "@@layout/SET_BROWSER"
});

export const toggleNavigationAction = (): LayoutToggleNavigation => ({
  type: "@@layout/TOGGLE_NAVIGATION"
});
