import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nadeNadeClearAction, newNadeSetStep } from "./NewNadeActions";
import { NewNadeStep } from "./NewNadeReducer";
import {
  newNadeGfyData,
  newNadeGfyError,
  newNadeLoadingSelector,
  newNadeStepSelector,
} from "./NewNadeSelectors";
import { tryAddGfycat, tryAddImage } from "./NewNadeThunks";

export const useNewNade = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(newNadeStepSelector);
  const loading = useSelector(newNadeLoadingSelector);
  const error = useSelector(newNadeGfyError);
  const gfyData = useSelector(newNadeGfyData);

  const addGfycat = useCallback(
    (gfyIdOrUrl: string) => dispatch(tryAddGfycat(gfyIdOrUrl)),
    [dispatch]
  );

  const addImage = useCallback(
    (imgData: string) => dispatch(tryAddImage(imgData)),
    [dispatch]
  );

  const setStep = useCallback(
    (step: NewNadeStep) => dispatch(newNadeSetStep(step)),
    [dispatch]
  );

  const reset = useCallback(() => dispatch(nadeNadeClearAction()), [dispatch]);

  return {
    currentStep,
    setStep,
    error,
    gfyData,
    addGfycat,
    addImage,
    loading,
    reset,
  };
};
