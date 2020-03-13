import React, { FC, useReducer } from "react";
import { Nade } from "../../models/Nade/Nade";
import { NadeActions } from "./actions";
import {
  nadePageInitialState,
  NadePageReducer,
  NadePageState,
} from "./reducer";

type ContextApi = {
  state: NadePageState;
  dispatch: React.Dispatch<NadeActions>;
};

export const NadePageStoreContext = React.createContext<ContextApi>(null);

type Props = {
  nade: Nade;
};

export const NadePageStoreProvider: FC<Props> = ({ children, nade }) => {
  const [state, dispatch] = useReducer(NadePageReducer, {
    ...nadePageInitialState,
    nade,
  });

  const value = { state, dispatch };

  return (
    <NadePageStoreContext.Provider value={value}>
      {children}
    </NadePageStoreContext.Provider>
  );
};
