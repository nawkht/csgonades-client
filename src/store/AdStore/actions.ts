type RegisterPlaceholder = {
  type: "Ads/RegisterPlaceholder";
  slot: number;
};

type BeforeNavigationChange = {
  type: "Ads/BeforeNavigationChange";
};

export type AdActions = RegisterPlaceholder | BeforeNavigationChange;
