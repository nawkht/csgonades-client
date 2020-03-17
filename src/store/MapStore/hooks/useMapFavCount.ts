import { useMapStoreDispatch } from "./helpers";
import { useCallback } from "react";

export const useMapFavCount = () => {
  const dispatch = useMapStoreDispatch();

  const incrementNadeFavCount = useCallback(
    (nadeId: string) => {
      dispatch({
        type: "MapStore/IncrementNadeFavoriteCount",
        nadeId,
      });
    },
    [dispatch]
  );

  const decrementNadeFavCount = useCallback(
    (nadeId: string) => {
      dispatch({
        type: "MapStore/DecrementNadeFavoriteCount",
        nadeId,
      });
    },
    [dispatch]
  );

  return {
    incrementNadeFavCount,
    decrementNadeFavCount,
  };
};
