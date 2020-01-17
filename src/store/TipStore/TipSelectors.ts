import { AppState } from "..";
import { TipKeys } from "./TipReducer";

export const hasSeenTip = (toolTip: TipKeys) => {
  return (state: AppState) => state.tipStore[toolTip];
};
