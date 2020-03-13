import { useCallback, useContext } from "react";
import { NadePageStoreContext } from "../context";

export const useIncrementNadeFavCount = () => {
  const { dispatch } = useContext(NadePageStoreContext);

  const incrementNadeFavoriteCount = useCallback(() => {
    dispatch({ type: "@@nades/ON_FAVORITE_NADE" });
  }, [dispatch]);

  return incrementNadeFavoriteCount;
};
