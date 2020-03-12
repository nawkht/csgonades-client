import React, { FC, useReducer } from "react";
import { NadeLight } from "../../models/Nade/Nade";
import { NadeFilterActions } from "./actions";
import { FilterState, nadeFilterReducer } from "./reducer";

const INIT_STATE: FilterState = {
  nades: [],
  byFavorites: false,
  byTickrate: "any",
  positionModalOpen: false,
};

type FilterContextApi = {
  state: FilterState;
  dispatch: React.Dispatch<NadeFilterActions>;
};

export const NadeFilterContext = React.createContext<FilterContextApi>(null);

type Props = {
  nades: NadeLight[];
};

export const NadeFilterProvider: FC<Props> = ({ children, nades }) => {
  const [state, dispatch] = useReducer(nadeFilterReducer, {
    ...INIT_STATE,
    nades,
  });

  const value = { state, dispatch };

  return (
    <NadeFilterContext.Provider value={value}>
      {children}
    </NadeFilterContext.Provider>
  );
};
