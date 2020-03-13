import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFavorites } from "../../../api/FavoriteApi";
import { userSelector } from "../../AuthStore/AuthSelectors";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { addAllFavoritesAction } from "../FavoriteActions";

export const useFetchFavorites = () => {
  const [hasCalled, setHasCalled] = useState(false);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const getToken = useGetOrUpdateToken();

  useEffect(() => {
    if (!user || hasCalled) {
      return;
    }

    (async () => {
      const token = await getToken();

      if (!token) {
        return;
      }

      setHasCalled(true);

      const result = await getUserFavorites(token);

      if (result.isOk()) {
        dispatch(addAllFavoritesAction(result.value));
      }
    })();
  }, [user, dispatch, getToken, hasCalled]);
};
