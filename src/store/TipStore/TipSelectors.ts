import { AppState } from "..";
import { TipKeys } from "./TipReducer";

export const hasSeenTip = (toolTip: TipKeys) => (state: AppState) =>
  state.tipStore[toolTip];
