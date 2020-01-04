type LayoutSetMobile = {
  type: "@@layout/SET_MOBILE";
};

type LayoutSetBrowser = {
  type: "@@layout/SET_BROWSER";
};

export type LayoutActions = LayoutSetMobile | LayoutSetBrowser;

export const setMobileAction = (): LayoutSetMobile => ({
  type: "@@layout/SET_MOBILE"
});

export const setBrowseraction = (): LayoutSetBrowser => ({
  type: "@@layout/SET_BROWSER"
});
