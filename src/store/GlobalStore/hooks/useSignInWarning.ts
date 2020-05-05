import { useSelector } from "react-redux";
import { signInWarningSelector } from "../GlobalSelectors";
import { useGlobalDispatch } from "./helpers";
import { useCallback } from "react";
import { SignInWarningType } from "../GlobalActions";

export const useSignInWarning = () => {
  const dispatch = useGlobalDispatch();
  const signInWarning = useSelector(signInWarningSelector);

  const setSignInWarning = useCallback(
    (warningType: SignInWarningType) => {
      dispatch({
        type: "Global/SetSignInWarning",
        warningType,
      });
    },
    [dispatch]
  );

  const clearSignInWarning = useCallback(() => {
    dispatch({
      type: "Global/ClearSignInWarning",
    });
  }, [dispatch]);

  return {
    signInWarning,
    setSignInWarning,
    clearSignInWarning,
  };
};
