import { useDispatch, useSelector } from "react-redux";
import { nadeNadeClearAction, newNadeSetStep } from "./NewNadeActions";
import { NewNadeStep } from "./NewNadeReducer";
import {
  newNadeGfyData,
  newNadeGfyError,
  newNadeLoadingSelector,
  newNadeStepSelector
} from "./NewNadeSelectors";
import { tryAddGfycat, tryAddImage } from "./NewNadeThunks";

export const useNewNade = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(newNadeStepSelector);
  const loading = useSelector(newNadeLoadingSelector);
  const error = useSelector(newNadeGfyError);
  const gfyData = useSelector(newNadeGfyData);

  function addGfycat(gfyIdOrUrl: string) {
    dispatch(tryAddGfycat(gfyIdOrUrl));
  }

  function addImage(imgData: string) {
    dispatch(tryAddImage(imgData));
  }

  function setStep(step: NewNadeStep) {
    dispatch(newNadeSetStep(step));
  }

  function reset() {
    dispatch(nadeNadeClearAction());
  }

  return {
    currentStep,
    setStep,
    error,
    gfyData,
    addGfycat,
    addImage,
    loading,
    reset
  };
};
