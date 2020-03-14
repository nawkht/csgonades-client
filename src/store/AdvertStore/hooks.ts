import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ezoicInit } from "../../common/ezoicLoader/EzoinInit";
import { registerAdAction } from "./actions";
import { adCodeSelector } from "./selectors";

const isBrowser = typeof window !== "undefined";

export const useRegisterAdPlaceholder = () => {
  const dispatch = useDispatch();

  const registerAdPlaceholder = useCallback(
    (code: number, page: string) => {
      dispatch(registerAdAction(code, page));
    },
    [dispatch]
  );

  return registerAdPlaceholder;
};

export const useInitAdvert = () => {
  const location = isBrowser
    ? window.location.pathname + window.location.search
    : "";
  const adCodes = useSelector(adCodeSelector(location));

  useEffect(() => {
    const delay = setTimeout(() => {
      ezoicInit(adCodes);
    }, 1000);
    return () => clearTimeout(delay);
  }, [adCodes]);
};
