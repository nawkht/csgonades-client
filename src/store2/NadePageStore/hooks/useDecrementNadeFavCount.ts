import { useCallback, useContext } from "react";
import { NadePageStoreContext } from "../context";

export const useDescrementNadeFavCount = () => {
  const { dispatch } = useContext(NadePageStoreContext);

  const decrementNadeFavCount = useCallback(() => {
    dispatch({ type: "@@nades/ON_UNFAVORITE_NADE" });
  }, [dispatch]);

  return decrementNadeFavCount;
};
