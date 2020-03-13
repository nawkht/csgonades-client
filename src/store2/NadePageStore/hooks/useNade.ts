import { useContext } from "react";
import { NadePageStoreContext } from "../context";
export const useNade = () => {
  const { state } = useContext(NadePageStoreContext);
  return state.nade;
};
