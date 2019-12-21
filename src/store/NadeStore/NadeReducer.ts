import { Reducer } from "redux";
import { NadeLight, Nade } from "../../models/Nade";
import { NadeActions } from "./NadeActions";

export type NadeState = {
  nades: NadeLight[];
  viewingNade?: Nade;
};

const initialState: NadeState = {
  nades: []
};

export const NadeReducer: Reducer<NadeState, NadeActions> = (
  state = initialState,
  action
): NadeState => {
  switch (action.type) {
    case "@@nades/add":
      return {
        ...state,
        nades: action.nades
      };

    default:
      return state;
  }
};
