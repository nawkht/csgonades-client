import { NadeApi } from "../../api/NadeApi";
import { NadeBody } from "../../models/Nade/Nade";
import { cleanGfycatUrl, redirectNadePage } from "../../utils/Common";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  newNadeAddGfyDataAction,
  newNadeErrorAction,
  newNadeSetStep,
  newNadeStartLoadingAction
} from "./NewNadeActions";

export const tryAddGfycat = (gfyIdOrUrl: string): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const isAdmin = getState().authStore.user?.role === "administrator";
    dispatch(newNadeStartLoadingAction());

    const cleanId = cleanGfycatUrl(gfyIdOrUrl);

    const gfyResult = await NadeApi.validateGfycat(cleanId);

    if (gfyResult.isErr()) {
      GoogleAnalytics.event({
        category: "New Nade Error",
        action: "Failed gfycat",
        ignore: isAdmin
      });
      return dispatch(
        newNadeErrorAction("Can't find the gfycat or gfycat.com might be down.")
      );
    }

    const gfyData = gfyResult.value;

    dispatch(newNadeAddGfyDataAction(gfyData));
    GoogleAnalytics.event({
      category: "New Nade",
      action: "Set gfycat",
      ignore: isAdmin
    });

    dispatch(newNadeSetStep("result-img"));
  };
};

export const tryAddImage = (imgData: string): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = tokenSelector(state);
    const isAdmin = state.authStore.user?.role === "administrator";
    if (!token) {
      return dispatch(newNadeErrorAction("You don't seem to be signed in."));
    }

    GoogleAnalytics.event({
      category: "New Nade",
      action: "Set image",
      ignore: isAdmin
    });

    dispatch(newNadeStartLoadingAction());

    const { gfyData } = state.newNadeStore;

    if (!gfyData) {
      GoogleAnalytics.event({
        category: "New Nade Error",
        action: "Missing gfycat video",
        ignore: isAdmin
      });
      return dispatch(
        newNadeErrorAction("Missing gfycat video, you forgot a step.")
      );
    }

    const nadeBody: NadeBody = {
      imageBase64: imgData,
      gfycatIdOrUrl: gfyData.gfyId
    };

    const result = await NadeApi.save(nadeBody, token);

    if (result.isErr()) {
      GoogleAnalytics.event({
        category: "New Nade Error",
        action: "Submit error",
        ignore: isAdmin
      });
      return dispatch(
        newNadeErrorAction(
          "Failed to submit, try again or the service might be down."
        )
      );
    }

    const { id } = result.value;

    GoogleAnalytics.event({
      category: "New Nade",
      action: "Submitted",
      ignore: isAdmin
    });

    redirectNadePage(id);
  };
};
