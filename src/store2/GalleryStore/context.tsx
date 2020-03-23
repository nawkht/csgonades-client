import React, { FC, useReducer } from "react";
import { GalleryActions } from "./actions";
import { galleryInitialState, GalleryReducer, GalleryState } from "./reducer";

type ContextApi = {
  state: GalleryState;
  dispatch: React.Dispatch<GalleryActions>;
};

// @ts-ignore
export const GalleryStoreContext = React.createContext<ContextApi>(null);

export const GalleryStoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(GalleryReducer, galleryInitialState);

  const value = { state, dispatch };

  return (
    <GalleryStoreContext.Provider value={value}>
      {children}
    </GalleryStoreContext.Provider>
  );
};
