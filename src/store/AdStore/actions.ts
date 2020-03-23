type RegisterPlaceholder = {
  type: "Ads/RegisterPlaceholder";
  slot: number;
};

type ClearAdSlots = {
  type: "Ads/ClearAdSlots";
};

export type AdActions = RegisterPlaceholder | ClearAdSlots;
