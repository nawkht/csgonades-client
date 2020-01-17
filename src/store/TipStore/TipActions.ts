import { TipKeys } from "./TipReducer";

type SetSeenTipAction = {
  type: "@@tip/SEEN_TIP";
  tip: TipKeys;
};

export const seenTipAction = (tip: TipKeys): SetSeenTipAction => ({
  type: "@@tip/SEEN_TIP",
  tip
});

export type TipActions = SetSeenTipAction;
