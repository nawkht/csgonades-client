import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthApi } from "../../../api/TokenApi";
import { tokenExpiredOrAboutTo } from "../../../utils/TokenUtil";
import { setToken } from "../AuthActions";
import { tokenSelector } from "../AuthSelectors";

export const useGetOrUpdateToken = (): (() => Promise<string | null>) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const getToken = useCallback(async () => {
    if (!token) {
      return null;
    }

    const shouldRefresh = tokenExpiredOrAboutTo(token);

    if (!shouldRefresh) {
      return token;
    }

    const tokenResult = await AuthApi.refreshToken();

    if (tokenResult.isErr()) {
      return null;
    }

    dispatch(setToken(tokenResult.value));

    return tokenResult.value;
  }, [token, dispatch]);

  return getToken;
};
