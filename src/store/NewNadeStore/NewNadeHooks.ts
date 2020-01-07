import { useDispatch, useSelector } from "react-redux";
import { newNadeAddImageAction } from "./NewNadeActions";
import { tryAddGfycat, trySubmitNewNade } from "./NewNadeThunks";
import {
  newNadeGfyIsLoading,
  newNadeGfyError,
  newNadeGfyData,
  newNadeImageData,
  newNadeLoadingSubmit
} from "./NewNadeSelectors";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";

export const useNewNade = () => {
  const dispatch = useDispatch();
  const gfyIsLoading = useSelector(newNadeGfyIsLoading);
  const gfyError = useSelector(newNadeGfyError);
  const gfyData = useSelector(newNadeGfyData);
  const imageData = useSelector(newNadeImageData);
  const loadingSubmit = useSelector(newNadeLoadingSubmit);

  function addGfycat(gfyIdOrUrl: string) {
    GoogleAnalytics.event("New Nade", "Set gfycat");
    dispatch(tryAddGfycat(gfyIdOrUrl));
  }

  function addImage(imgData: string) {
    GoogleAnalytics.event("New Nade", "Set image");
    dispatch(newNadeAddImageAction(imgData));
  }

  function submit() {
    dispatch(trySubmitNewNade());
    GoogleAnalytics.event("New Nade", "Submit");
  }

  return {
    gfyIsLoading,
    gfyError,
    gfyData,
    imageData,
    addGfycat,
    addImage,
    loadingSubmit,
    submit
  };
};
