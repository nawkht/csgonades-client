import { NadeApi } from "../../api/NadeApi";
import { NadeBody } from "../../models/Nade/Nade";
import { cleanGfycatUrl, redirectNadePage } from "../../utils/Common";
import { addNotificationAction } from "../NotificationStore/NotificationActions";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  nadeNadeClearAction,
  newNadeAddGfyDataAction,
  newNadeErrorAction,
  newNadeStartLoadingAction,
  newNadeSubmitError,
  newNadeSubmitStartLoadingAction
} from "./NewNadeActions";

export const tryAddGfycat = (gfyIdOrUrl: string): ReduxThunkAction => {
  return async dispatch => {
    dispatch(newNadeStartLoadingAction());

    const cleanId = cleanGfycatUrl(gfyIdOrUrl);

    const gfyResult = await NadeApi.validateGfycat(cleanId);

    if (gfyResult.isErr()) {
      return dispatch(newNadeErrorAction(gfyResult.error.message));
    }

    const gfyData = gfyResult.value;

    dispatch(newNadeAddGfyDataAction(gfyData));
  };
};

export const trySubmitNewNade = (): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const { token } = state.authStore;
    if (!token) {
      console.warn("useCreateNade no token");
      return;
    }

    const { imageData, gfyData } = state.newNadeStore;

    if (!imageData || !gfyData) {
      console.error("Trying to submit with no image or gfyid");
      return;
    }

    dispatch(newNadeSubmitStartLoadingAction());

    const nadeBody: NadeBody = {
      imageBase64: imageData,
      gfycatIdOrUrl: gfyData.gfyId
    };

    const result = await NadeApi.save(nadeBody, token);

    if (result.isErr()) {
      dispatch(newNadeSubmitError());
      return dispatch(
        addNotificationAction({
          severity: "error",
          message:
            "Failed to submit the nade.\nTry refreshing and try again, or the service might be down.",
          durationSeconds: 15
        })
      );
    }

    const { id } = result.value;

    dispatch(nadeNadeClearAction());

    redirectNadePage(id);
  };
};
