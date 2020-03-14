import React, { FC, useReducer } from "react";
import { createContainer } from "react-tracked";
import { NadeLight } from "../../models/Nade/Nade";
import { FilterState, nadeFilterReducer } from "./reducer";

const INIT_STATE: FilterState = {
  nades: [],
  byFavorites: false,
  byTickrate: "any",
  positionModalOpen: false,
};

const useValue = (props: Props) =>
  useReducer(nadeFilterReducer, { ...INIT_STATE, nades: props.nades });

const container = createContainer(useValue);

export const NadeFilterContext = container;

export const useNadeFilterState = () => {
  const [state, dispatch] = container.useTracked();

  return {
    state,
    dispatch,
  };
};

type Props = {
  nades: NadeLight[];
};

export const NadeFilterProvider: FC<Props> = ({ children, nades }) => {
  return (
    <NadeFilterContext.Provider nades={nades}>
      {children}
    </NadeFilterContext.Provider>
  );
};
