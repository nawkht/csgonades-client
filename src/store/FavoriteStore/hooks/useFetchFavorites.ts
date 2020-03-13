import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFavorites } from "../../../api/FavoriteApi";
import { userSelector } from "../../AuthStore/AuthSelectors";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { addAllFavoritesAction } from "../FavoriteActions";

export const useFetchFavorites = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const getToken = useGetOrUpdateToken();

  useEffect(() => {
    if (!user) {
      return;
    }

    (async () => {
      const token = await getToken();

      if (!token) {
        return;
      }

      const result = await getUserFavorites(token);

      if (result.isOk()) {
        dispatch(addAllFavoritesAction(result.value));
      }
    })();
  }, [user, dispatch, getToken]);
};
